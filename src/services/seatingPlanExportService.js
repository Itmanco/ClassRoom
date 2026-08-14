import * as XLSX from "xlsx-js-style";

function safeFileName(value) {
  return String(value || "seating-plan")
    .replace(/[\\/:*?"<>|]/g, "-")
    .trim();
}

function studentLabel(student) {
  if (!student) {
    return "";
  }

  if (student.hiragana) {
    return `${student.name}\n${student.hiragana}`;
  }

  return student.name || "";
}

function cellStyle({
  bold = false,
  fontSize = 11,
  horizontal = "center",
  vertical = "center",
  border = true,
} = {}) {
  const style = {
    font: {
      bold,
      sz: fontSize,
    },

    alignment: {
      horizontal,
      vertical,
      wrapText: true,
    },
  };

  if (border) {
    const edge = {
      style: "thin",
      color: {
        rgb: "777777",
      },
    };

    style.border = {
      top: edge,
      bottom: edge,
      left: edge,
      right: edge,
    };
  }

  return style;
}

function setCell(
  worksheet,
  address,
  value,
  style = {},
) {
  worksheet[address] = {
    t: "s",
    v: value == null ? "" : String(value),
    s: style,
  };
}

function merge(
  worksheet,
  startRow,
  startCol,
  endRow,
  endCol,
) {
  worksheet["!merges"].push({
    s: {
      r: startRow,
      c: startCol,
    },

    e: {
      r: endRow,
      c: endCol,
    },
  });
}

function exportTimestamp() {
  const now = new Date();

  const year =
    now.getFullYear();

  const month =
    String(
      now.getMonth() + 1,
    ).padStart(2, "0");

  const day =
    String(
      now.getDate(),
    ).padStart(2, "0");

  const hours =
    String(
      now.getHours(),
    ).padStart(2, "0");

  const minutes =
    String(
      now.getMinutes(),
    ).padStart(2, "0");

  return `${year}-${month}-${day}_${hours}-${minutes}`;
}

export function exportSeatingPlan({
  plan,
  classroom,
  room,
  students,
}) {
  if (!plan) {
    throw new Error(
      "A seating plan is required for export.",
    );
  }

  if (!room) {
    throw new Error(
      "The seating plan room could not be found.",
    );
  }

  const deskCount =
    Number(
      plan.deskCount ||
      room.deskCount,
    ) || 0;

  const seatsPerDesk =
    Number(
      plan.seatsPerDesk ||
      room.seatsPerDesk,
    ) || 1;

  const teacherPosition =
    room.teacherPosition ||
    "front-left";

  const studentMap =
    new Map(
      students.map(
        (student) => [
          String(student.id),
          student,
        ],
      ),
    );

  const assignmentMap =
    new Map(
      (plan.assignments || []).map(
        (assignment) => [
          `${assignment.deskNumber}:${assignment.seatNumber}`,
          String(
            assignment.studentId,
          ),
        ],
      ),
    );

  const workbook =
    XLSX.utils.book_new();

  const worksheet = {
    "!ref": "A1:A1",
    "!merges": [],
  };

  /*
   * Classroom layout:
   *
   * left desk block
   * central aisle
   * right desk block
   */

  const leftStartColumn = 1;

  const aisleWidth = 2;

  const rightStartColumn =
    leftStartColumn +
    seatsPerDesk +
    aisleWidth;

  const totalColumns =
    rightStartColumn +
    seatsPerDesk;

  let row = 0;

  // --------------------------------------------------
  // Title
  // --------------------------------------------------

  merge(
    worksheet,
    row,
    0,
    row,
    totalColumns - 1,
  );

  setCell(
    worksheet,
    XLSX.utils.encode_cell({
      r: row,
      c: 0,
    }),
    plan.title,
    cellStyle({
      bold: true,
      fontSize: 16,
      border: false,
    }),
  );

  row += 1;

  // --------------------------------------------------
  // Class / room / plan date
  // --------------------------------------------------

  const classLabel =
    classroom
      ? `${classroom.code || ""} ${
          classroom.name || ""
        }`.trim()
      : "";

  const roomLabel =
    `${room.code || room.id || ""} ${
      room.name || ""
    }`.trim();

  merge(
    worksheet,
    row,
    0,
    row,
    totalColumns - 1,
  );

  setCell(
    worksheet,
    XLSX.utils.encode_cell({
      r: row,
      c: 0,
    }),
    [
      classLabel,
      roomLabel,
      plan.planDate,
    ]
      .filter(Boolean)
      .join("  ·  "),
    cellStyle({
      fontSize: 10,
      border: false,
    }),
  );

  row += 2;

    // --------------------------------------------------
  // Teacher + whiteboard
  // --------------------------------------------------

  const usableStartColumn =
    leftStartColumn;

  const usableEndColumn =
    totalColumns - 2;

  let boardStart =
    usableStartColumn;

  let boardEnd =
    usableEndColumn;

  if (
    teacherPosition ===
    "front-left"
  ) {
    const teacherColumn =
      usableStartColumn;

    setCell(
      worksheet,
      XLSX.utils.encode_cell({
        r: row,
        c: teacherColumn,
      }),
      "Teacher",
      cellStyle({
        bold: true,
        fontSize: 9,
      }),
    );

    boardStart =
      teacherColumn + 1;
  }

  if (
    teacherPosition ===
    "front-right"
  ) {
    const teacherColumn =
      usableEndColumn;

    setCell(
      worksheet,
      XLSX.utils.encode_cell({
        r: row,
        c: teacherColumn,
      }),
      "Teacher",
      cellStyle({
        bold: true,
        fontSize: 9,
      }),
    );

    boardEnd =
      teacherColumn - 1;
  }

  if (
    boardEnd >= boardStart
  ) {
    merge(
      worksheet,
      row,
      boardStart,
      row,
      boardEnd,
    );

    setCell(
      worksheet,
      XLSX.utils.encode_cell({
        r: row,
        c: boardStart,
      }),
      "WHITEBOARD",
      cellStyle({
        bold: true,
        fontSize: 10,
      }),
    );
  }

  row += 2;

  // --------------------------------------------------
  // Student desks
  // --------------------------------------------------

  for (
    let deskNumber = 1;
    deskNumber <= deskCount;
    deskNumber += 2
  ) {
    const leftDesk =
      deskNumber;

    const rightDesk =
      deskNumber + 1 <= deskCount
        ? deskNumber + 1
        : null;

    // ------------------------------
    // Desk labels
    // ------------------------------

    merge(
      worksheet,
      row,
      leftStartColumn,
      row,
      leftStartColumn +
        seatsPerDesk -
        1,
    );

    setCell(
      worksheet,
      XLSX.utils.encode_cell({
        r: row,
        c: leftStartColumn,
      }),
      `Desk ${leftDesk}`,
      cellStyle({
        bold: false,
        fontSize: 7,
        border: false,
      }),
    );

    if (rightDesk) {
      merge(
        worksheet,
        row,
        rightStartColumn,
        row,
        rightStartColumn +
          seatsPerDesk -
          1,
      );

      setCell(
        worksheet,
        XLSX.utils.encode_cell({
          r: row,
          c: rightStartColumn,
        }),
        `Desk ${rightDesk}`,
        cellStyle({
          bold: false,
          fontSize: 7,
          border: false,
        }),
      );
    }

    row += 1;

    // ------------------------------
    // Student seats
    // ------------------------------

    for (
      let seatNumber = 1;
      seatNumber <= seatsPerDesk;
      seatNumber += 1
    ) {
      const leftStudentId =
        assignmentMap.get(
          `${leftDesk}:${seatNumber}`,
        );

      const leftStudent =
        leftStudentId
          ? studentMap.get(
              String(
                leftStudentId,
              ),
            )
          : null;

      setCell(
        worksheet,
        XLSX.utils.encode_cell({
          r: row,
          c:
            leftStartColumn +
            seatNumber -
            1,
        }),
        studentLabel(
          leftStudent,
        ),
        cellStyle({
          bold:
            Boolean(
              leftStudent,
            ),
          fontSize: 11,
        }),
      );

      if (rightDesk) {
        const rightStudentId =
          assignmentMap.get(
            `${rightDesk}:${seatNumber}`,
          );

        const rightStudent =
          rightStudentId
            ? studentMap.get(
                String(
                  rightStudentId,
                ),
              )
            : null;

        setCell(
          worksheet,
          XLSX.utils.encode_cell({
            r: row,
            c:
              rightStartColumn +
              seatNumber -
              1,
          }),
          studentLabel(
            rightStudent,
          ),
          cellStyle({
            bold:
              Boolean(
                rightStudent,
              ),
            fontSize: 11,
          }),
        );
      }
    }

    row += 2;
  }

  // --------------------------------------------------
  // Teacher at back
  // --------------------------------------------------

  if (
    teacherPosition ===
      "back-left" ||
    teacherPosition ===
      "back-right"
  ) {
    const teacherColumn =
      teacherPosition ===
      "back-left"
        ? leftStartColumn
        : rightStartColumn +
          seatsPerDesk -
          1;

    setCell(
      worksheet,
      XLSX.utils.encode_cell({
        r: row,
        c: teacherColumn,
      }),
      "Teacher",
      cellStyle({
        bold: true,
        fontSize: 9,
      }),
    );

    row += 1;
  }

  // --------------------------------------------------
  // Worksheet range
  // --------------------------------------------------

  worksheet["!ref"] =
    XLSX.utils.encode_range({
      s: {
        r: 0,
        c: 0,
      },

      e: {
        r: Math.max(
          row,
          1,
        ),
        c:
          totalColumns -
          1,
      },
    });

  // --------------------------------------------------
  // Column widths
  // --------------------------------------------------

  worksheet["!cols"] =
    Array.from(
      {
        length:
          totalColumns,
      },
      (
        _,
        columnIndex,
      ) => {
        const aisleStart =
          leftStartColumn +
          seatsPerDesk;

        const aisleEnd =
          rightStartColumn;

        const isAisle =
          columnIndex >=
            aisleStart &&
          columnIndex <
            aisleEnd;

        if (
          columnIndex === 0
        ) {
          return {
            wch: 3,
          };
        }

        return {
          wch: isAisle
            ? 4
            : 18,
        };
      },
    );

  // --------------------------------------------------
  // Row heights
  // --------------------------------------------------

  const rowCount =
    Math.max(
      row + 1,
      1,
    );

  worksheet["!rows"] =
    Array.from(
      {
        length:
          rowCount,
      },
      () => ({
        hpt: 30,
      }),
    );

  // Title
  worksheet["!rows"][0] = {
    hpt: 24,
  };

  // Class / room / date
  if (
    worksheet["!rows"][1]
  ) {
    worksheet["!rows"][1] = {
      hpt: 20,
    };
  }

  // Empty row before front
  if (
    worksheet["!rows"][2]
  ) {
    worksheet["!rows"][2] = {
      hpt: 8,
    };
  }

  // Teacher / whiteboard
  if (
    worksheet["!rows"][3]
  ) {
    worksheet["!rows"][3] = {
      hpt: 24,
    };
  }

  // Empty row after whiteboard
  if (
    worksheet["!rows"][4]
  ) {
    worksheet["!rows"][4] = {
      hpt: 8,
    };
  }

  /*
   * From row 5 onward:
   *
   * desk label
   * student names
   * empty spacer
   */

  for (
    let deskRow = 5;
    deskRow < rowCount;
    deskRow += 3
  ) {
    // Desk number
    worksheet["!rows"][
      deskRow
    ] = {
      hpt: 14,
    };

    // Student cells
    if (
      worksheet["!rows"][
        deskRow + 1
      ]
    ) {
      worksheet["!rows"][
        deskRow + 1
      ] = {
        hpt: 30,
      };
    }

    // Spacer
    if (
      worksheet["!rows"][
        deskRow + 2
      ]
    ) {
      worksheet["!rows"][
        deskRow + 2
      ] = {
        hpt: 8,
      };
    }
  }

  // --------------------------------------------------
  // Print / page setup
  // --------------------------------------------------

  worksheet["!pageSetup"] = {
    orientation: "landscape",
    paperSize: 9, // A4
    fitToWidth: 1,
    fitToHeight: 1,
  };

  worksheet["!margins"] = {
    left: 0.3,
    right: 0.3,
    top: 0.4,
    bottom: 0.4,
    header: 0.2,
    footer: 0.2,
  };

  worksheet["!printOptions"] = {
    horizontalCentered: true,
    verticalCentered: true,
  };

  // --------------------------------------------------
  // Add worksheet
  // --------------------------------------------------

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Seating Plan",
  );

  // --------------------------------------------------
  // Filename
  // --------------------------------------------------

  const classNumber =
    classroom?.code ||
    classroom?.name ||
    "class";

  const fileName =
    `${safeFileName(
      classNumber,
    )}_${exportTimestamp()}.xlsx`;

  XLSX.writeFile(
    workbook,
    fileName,
  );
}
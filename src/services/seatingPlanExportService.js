import ExcelJS from "exceljs";

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

function printedAtLabel() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    now.getDate(),
  ).padStart(2, "0");

  const hours = String(
    now.getHours(),
  ).padStart(2, "0");

  const minutes = String(
    now.getMinutes(),
  ).padStart(2, "0");

  return (
    `${year}-${month}-${day} ` +
    `${hours}:${minutes}`
  );
}

function exportTimestamp() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    now.getDate(),
  ).padStart(2, "0");

  const hours = String(
    now.getHours(),
  ).padStart(2, "0");

  const minutes = String(
    now.getMinutes(),
  ).padStart(2, "0");

  return (
    `${year}-${month}-${day}_` +
    `${hours}-${minutes}`
  );
}

function cellStyle({
  bold = false,
  fontSize = 11,
  horizontal = "center",
  vertical = "middle",
  border = true,
} = {}) {
  const style = {
    font: {
      bold,
      size: fontSize,
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
        argb: "FF777777",
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
  row,
  column,
  value,
  style = {},
) {
  // Internal layout uses zero-based indexes.
  // ExcelJS uses one-based indexes.
  const cell = worksheet.getCell(
    row + 1,
    column + 1,
  );

  cell.value =
    value == null
      ? ""
      : String(value);

  if (style.font) {
    cell.font = style.font;
  }

  if (style.alignment) {
    cell.alignment =
      style.alignment;
  }

  if (style.border) {
    cell.border = style.border;
  }

  return cell;
}

function merge(
  worksheet,
  startRow,
  startCol,
  endRow,
  endCol,
) {
  worksheet.mergeCells(
    startRow + 1,
    startCol + 1,
    endRow + 1,
    endCol + 1,
  );
}

function excelColumnLetter(
  zeroBasedColumn,
) {
  let value =
    zeroBasedColumn + 1;

  let result = "";

  while (value > 0) {
    const remainder =
      (value - 1) % 26;

    result =
      String.fromCharCode(
        65 + remainder,
      ) + result;

    value =
      Math.floor(
        (value - 1) / 26,
      );
  }

  return result;
}

export async function exportSeatingPlan({
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
      room.deskCount ||
      plan.deskCount,
    ) || 0;

  const seatsPerDesk =
    Number(
      room.seatsPerDesk ||
      plan.seatsPerDesk,
    ) || 1;

  const desksPerRow =
    Math.max(
      1,
      Number(
        room.desksPerRow ||
        plan.desksPerRow,
      ) || 2,
    );

  const teacherPosition =
    room.teacherPosition ||
    plan.teacherPosition ||
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

  // --------------------------------------------------
  // Workbook
  // --------------------------------------------------

  const workbook =
    new ExcelJS.Workbook();

  workbook.creator =
    "Classroom Manager";

  workbook.created =
    new Date();

  const worksheet =
    workbook.addWorksheet(
      "Seating Plan",
      {
        pageSetup: {
          paperSize: 9,
          orientation: "landscape",

          fitToPage: true,
          fitToWidth: 1,
          fitToHeight: 1,

          horizontalCentered: true,
          verticalCentered: true,

          margins: {
            left: 0.25,
            right: 0.25,
            top: 0.3,
            bottom: 0.3,
            header: 0.15,
            footer: 0.15,
          },
        },
      },
    );

  worksheet.views = [
    {
      showGridLines: false,
    },
  ];

  // --------------------------------------------------
  // Classroom geometry
  // --------------------------------------------------

  // Column 0 works as a small left margin.
  const firstDeskColumn = 1;

  // One narrow column between physical desks.
  const deskGapColumns = 1;

  const deskWidth =
    seatsPerDesk;

  const totalDeskColumns =
    desksPerRow *
    deskWidth;

  const totalGapColumns =
    Math.max(
      0,
      desksPerRow - 1,
    ) * deskGapColumns;

  const totalColumns =
    firstDeskColumn +
    totalDeskColumns +
    totalGapColumns;

  const deskStartColumn = (
    deskIndex,
  ) =>
    firstDeskColumn +
    deskIndex *
      (
        deskWidth +
        deskGapColumns
      );

  let row = 0;

  // --------------------------------------------------
  // Class title
  // --------------------------------------------------

  const classTitle =
    classroom
      ? `${classroom.code || ""} ${
          classroom.name || ""
        }`.trim()
      : "Class";

  merge(
    worksheet,
    row,
    0,
    row,
    totalColumns - 1,
  );

  setCell(
    worksheet,
    row,
    0,
    classTitle,
    cellStyle({
      bold: true,
      fontSize: 16,
      border: false,
    }),
  );

  // --------------------------------------------------
  // Building / classroom
  // --------------------------------------------------

  row += 1;

  const locationLabel = [
    room.buildingId,
    room.code || room.id,
  ]
    .filter(Boolean)
    .join(" · ");

  merge(
    worksheet,
    row,
    0,
    row,
    totalColumns - 1,
  );

  setCell(
    worksheet,
    row,
    0,
    locationLabel,
    cellStyle({
      fontSize: 9,
      border: false,
    }),
  );

  // One blank row before classroom front.
  row += 6;
  const classroomFrontRow = row;
  // --------------------------------------------------
  // Teacher + whiteboard
  // --------------------------------------------------

  const usableStartColumn =
    firstDeskColumn;

  const usableEndColumn =
    totalColumns - 1;

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
      row,
      teacherColumn,
      "Teacher",
      cellStyle({
        bold: true,
        fontSize: 9,
      }),
    );

    // One empty column between
    // teacher and whiteboard.
    boardStart =
      teacherColumn + 2;
  }

  if (
    teacherPosition ===
    "front-right"
  ) {
    const teacherColumn =
      usableEndColumn;

    setCell(
      worksheet,
      row,
      teacherColumn,
      "Teacher",
      cellStyle({
        bold: true,
        fontSize: 9,
      }),
    );

    // One empty column between
    // whiteboard and teacher.
    boardEnd =
      teacherColumn - 2;
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

    /*
     * ExcelJS applies the border to
     * the merged cell range correctly,
     * including the right border.
     */
    setCell(
      worksheet,
      row,
      boardStart,
      "WHITEBOARD",
      cellStyle({
        bold: true,
        fontSize: 10,
      }),
    );
  }

  // Blank row after classroom front.
  row += 2;

  // --------------------------------------------------
  // Student desks
  // --------------------------------------------------

  const firstDeskLayoutRow =
    row;

  for (
    let firstDeskNumber = 1;
    firstDeskNumber <= deskCount;
    firstDeskNumber += desksPerRow
  ) {
    const desksInThisRow =
      Math.min(
        desksPerRow,
        deskCount -
          firstDeskNumber +
          1,
      );

    // --------------------------------
    // Desk labels
    // --------------------------------

    for (
      let deskIndex = 0;
      deskIndex <
        desksInThisRow;
      deskIndex += 1
    ) {
      const deskNumber =
        firstDeskNumber +
        deskIndex;

      const startColumn =
        deskStartColumn(
          deskIndex,
        );

      const endColumn =
        startColumn +
        seatsPerDesk -
        1;

      merge(
        worksheet,
        row,
        startColumn,
        row,
        endColumn,
      );

      setCell(
        worksheet,
        row,
        startColumn,
        `Desk ${deskNumber}`,
        cellStyle({
          bold: false,
          fontSize: 7,
          border: false,
        }),
      );
    }

    row += 1;

    // --------------------------------
    // Student seats
    // --------------------------------

    for (
      let deskIndex = 0;
      deskIndex <
        desksInThisRow;
      deskIndex += 1
    ) {
      const deskNumber =
        firstDeskNumber +
        deskIndex;

      const startColumn =
        deskStartColumn(
          deskIndex,
        );

      for (
        let seatNumber = 1;
        seatNumber <=
          seatsPerDesk;
        seatNumber += 1
      ) {
        const studentId =
          assignmentMap.get(
            `${deskNumber}:${seatNumber}`,
          );

        const student =
          studentId
            ? studentMap.get(
                String(
                  studentId,
                ),
              )
            : null;

        setCell(
          worksheet,
          row,
          startColumn +
            seatNumber -
            1,
          studentLabel(
            student,
          ),
          cellStyle({
            bold:
              Boolean(
                student,
              ),
            fontSize: 11,
          }),
        );
      }
    }

    /*
     * Leave one visual spacer row
     * between physical desk rows.
     */
    row += 2;
  }

  const afterDeskLayoutRow =
    row;

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
        ? firstDeskColumn
        : totalColumns - 1;

    setCell(
      worksheet,
      row,
      teacherColumn,
      "Teacher",
      cellStyle({
        bold: true,
        fontSize: 9,
      }),
    );

    row += 1;
  }

  // --------------------------------------------------
  // Footer spacing
  // --------------------------------------------------

  row += 1;

  const footerStartRow =
    row;

  // --------------------------------------------------
  // Seating plan details
  // --------------------------------------------------

  const academicYear =
    classroom?.academicYear ||
    "";

  const semester =
    classroom?.semester ||
    "";

  const planDetails = [
    plan.title,

    academicYear
      ? `Academic year ${academicYear}`
      : "",

    semester
      ? `Semester ${semester}`
      : "",
  ]
    .filter(Boolean)
    .join(" · ");

  merge(
    worksheet,
    row,
    0,
    row,
    totalColumns - 1,
  );

  setCell(
    worksheet,
    row,
    0,
    planDetails,
    cellStyle({
      fontSize: 8,
      horizontal: "right",
      border: false,
    }),
  );

  row += 1;

  // --------------------------------------------------
  // Printed time
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
    row,
    0,
    `Printed: ${printedAtLabel()}`,
    cellStyle({
      fontSize: 8,
      horizontal: "right",
      border: false,
    }),
  );

  row += 1;

  // --------------------------------------------------
  // Room summary
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
    row,
    0,
    [
      `${deskCount} desks`,
      `${seatsPerDesk} seats/desk`,
      `${desksPerRow} desks/row`,
      `Capacity: ${
        deskCount *
        seatsPerDesk
      }`,
    ].join(" · "),
    cellStyle({
      fontSize: 8,
      horizontal: "right",
      border: false,
    }),
  );

  row += 1;

  const lastContentRow =
    row - 1;

  // --------------------------------------------------
  // Column widths
  // --------------------------------------------------

  for (
    let columnIndex = 0;
    columnIndex <
      totalColumns;
    columnIndex += 1
  ) {
    const column =
      worksheet.getColumn(
        columnIndex + 1,
      );

    if (
      columnIndex === 0
    ) {
      column.width = 2;

      continue;
    }

    const relativeColumn =
      columnIndex -
      firstDeskColumn;

    const blockWidth =
      deskWidth +
      deskGapColumns;

    const positionInBlock =
      relativeColumn %
      blockWidth;

    const isGap =
      positionInBlock >=
      deskWidth;

    column.width =
      isGap
        ? 2.5
        : 13;
  }

  // --------------------------------------------------
  // Row heights
  // --------------------------------------------------

  // Class title
  worksheet.getRow(
    1,
  ).height = 24;

  // Building / room
  worksheet.getRow(
    2,
  ).height = 18;

  // Blank row
  worksheet.getRow(
    3,
  ).height = 8;

  // Teacher / whiteboard
  worksheet.getRow(
    classroomFrontRow + 1,
  ).height = 24;

  // Blank after whiteboard
  worksheet.getRow(
    classroomFrontRow + 2,
  ).height = 8;

  /*
   * Each physical classroom row:
   *
   * desk label
   * students
   * spacer
   */

  for (
    let deskRow =
      firstDeskLayoutRow;
    deskRow <
      afterDeskLayoutRow;
    deskRow += 3
  ) {
    worksheet.getRow(
      deskRow + 1,
    ).height = 14;

    worksheet.getRow(
      deskRow + 2,
    ).height = 30;

    worksheet.getRow(
      deskRow + 3,
    ).height = 8;
  }

  // Footer
  worksheet.getRow(
    footerStartRow + 1,
  ).height = 15;

  worksheet.getRow(
    footerStartRow + 2,
  ).height = 14;

  worksheet.getRow(
    footerStartRow + 3,
  ).height = 14;

  // --------------------------------------------------
  // Print area
  // --------------------------------------------------

  const lastColumnLetter =
    excelColumnLetter(
      totalColumns - 1,
    );

  worksheet.pageSetup.printArea =
    `A1:${lastColumnLetter}${
      lastContentRow + 1
    }`;

  /*
   * Reinforce print setup after
   * all worksheet content exists.
   */
  worksheet.pageSetup.paperSize =
    9;

  worksheet.pageSetup.orientation =
    "landscape";

  worksheet.pageSetup.fitToPage =
    true;

  worksheet.pageSetup.fitToWidth =
    1;

  worksheet.pageSetup.fitToHeight =
    1;

  worksheet.pageSetup.horizontalCentered =
    true;

  worksheet.pageSetup.verticalCentered =
    true;

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

  // --------------------------------------------------
  // Browser download
  // --------------------------------------------------

  const buffer =
    await workbook.xlsx.writeBuffer();

  const blob =
    new Blob(
      [buffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    );

  const url =
    URL.createObjectURL(
      blob,
    );

  const anchor =
    document.createElement(
      "a",
    );

  anchor.href = url;

  anchor.download =
    fileName;

  document.body.appendChild(
    anchor,
  );

  anchor.click();

  anchor.remove();

  setTimeout(
    () => {
      URL.revokeObjectURL(
        url,
      );
    },
    1000,
  );
}
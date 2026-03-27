export const extractAccountAndYTD = (data) => {
    if (!data || !data.Reports || data.Reports.length === 0) {
      return []; // Return empty array if data is invalid
    }

    const report = data.Reports[0];
    if (!report.Rows) {
      return []; // Return empty array if Rows are missing
    }

    const extractedData = [];

    report.Rows.forEach(row => {
      if (row.RowType === 'Section' && row.Rows) {
        row.Rows.forEach(dataRow => {
          if (dataRow.RowType === 'Row' && dataRow.Cells && dataRow.Cells.length > 0) {
            const accountCell = dataRow.Cells[0];
            const ytdCreditCell = dataRow.Cells[4]; // Index 4 corresponds to "YTD Credit"

            if (accountCell && ytdCreditCell) {
              extractedData.push({
                account: accountCell.Value,
                ytdCredit: ytdCreditCell.Value,
              });
            }
          }
        });
      }
    });

    return extractedData;
  };
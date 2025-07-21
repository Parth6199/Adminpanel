const fetchSheetData = async () => {
  try {
    const res = await fetch('https://opensheet.elk.sh/1pDtlX0P8AJSZOQTWonOx4gTsqgeGiQLggOGaWp_PC6E/Sheet1');
    const data = await res.json();

    // Counts
    let total = 0, resolved = 0, pending = 0, internet = 0, telephone = 0;

    data.forEach(row => {
      total++;

      const status = row.STATUS?.toLowerCase() || '';
      const type = row['COMPLAIN TYPE']?.toLowerCase() || '';

      if (status.includes("attended")) resolved++;
      else pending++;

      if (type.includes("internet")) internet++;
      if (type.includes("telephone")) telephone++;
    });

    // Inject counts
    document.getElementById("totalCount").textContent = total;
    document.getElementById("resolvedCount").textContent = resolved;
    document.getElementById("pendingCount").textContent = pending;
    document.getElementById("internetCount").textContent = internet;
    document.getElementById("telephoneCount").textContent = telephone;

  } catch (err) {
    console.error("Error loading sheet data:", err);
  }
};

fetchSheetData()
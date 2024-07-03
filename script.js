//let price = 1.87;
//let cid = [
//  ['PENNY', 1.01],
//  ['NICKEL', 2.05],
//  ['DIME', 3.1],
//  ['QUARTER', 4.25],
//  ['ONE', 90],
//  ['FIVE', 55],
//  ['TEN', 20],
//  ['TWENTY', 60],
//  ['ONE HUNDRED', 100]
//];

// Define global variables for price and cash in drawer (cid)
const price = 19.5;
const cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

document.getElementById('purchase-btn').addEventListener('click', function() {
    const cash = parseFloat(document.getElementById('cash').value);

    // Function to calculate the change due
    function calculateChange(price, cash, cid) {
        let changeDue = cash - price;
        if (changeDue < 0) {
            alert("Customer does not have enough money to purchase the item");
            return {status: "INSUFFICIENT_FUNDS", change: []};
        } else if (changeDue === 0) {
            return {status: "No change due - customer paid with exact cash", change: []};
        } else {
            const changeArray = [];
            let status = "OPEN";
            const denominations = [
                ["ONE HUNDRED", 100],
                ["TWENTY", 20],
                ["TEN", 10],
                ["FIVE", 5],
                ["ONE", 1],
                ["QUARTER", 0.25],
                ["DIME", 0.1],
                ["NICKEL", 0.05],
                ["PENNY", 0.01]
            ];

            let totalCid = cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2);

            if (totalCid < changeDue) {
                status = "INSUFFICIENT_FUNDS";
                return {status: status, change: []};
            }

            cid = cid.reverse();
            for (let i = 0; i < denominations.length; i++) {
                let coinName = denominations[i][0];
                let coinValue = denominations[i][1];
                let coinAvailable = cid[i][1];
                let coinAmount = 0;

                while (changeDue >= coinValue && coinAvailable > 0) {
                    changeDue -= coinValue;
                    changeDue = changeDue.toFixed(2);
                    coinAvailable -= coinValue;
                    coinAmount += coinValue;
                }

                if (coinAmount > 0) {
                    changeArray.push([coinName, coinAmount]);
                }
            }

            if (changeDue > 0) {
                status = "INSUFFICIENT_FUNDS";
                return {status: status, change: []};
            }

        if (totalCid == changeDue) {
            status = "CLOSED";
        }

            return {status: status, change: changeArray};
        }
    }

    const result = calculateChange(price, cash, cid);

    if (result.status === "INSUFFICIENT_FUNDS") {
        document.getElementById('change-due').innerText = "Status: INSUFFICIENT_FUNDS";
    } else if (result.status === "No change due - customer paid with exact cash") {
        document.getElementById('change-due').innerText = result.status;
    } else {
        let changeMessage = `Status: ${result.status}`;
        result.change.forEach(coin => {
            changeMessage += ` ${coin[0]}: $${coin[1]}`;
        });
        document.getElementById('change-due').innerText = changeMessage;
    }
});

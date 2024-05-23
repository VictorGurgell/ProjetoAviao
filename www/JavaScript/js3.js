document.addEventListener('DOMContentLoaded', () => {
    const seats = document.querySelectorAll('.seat');

    seats.forEach(seat => {
        const seatId = seat.id;
        const clients = JSON.parse(localStorage.getItem('clients')) || {};
        const clientName = clients[seatId];

        if (clientName) {
            seat.classList.add('unavailable');
        }

        seat.addEventListener('click', () => {
            if (clientName) {
                alert(`Assento está ocupado por ${clientName}.`);
            } else {
                alert(`Assento está livre.`);
            }
        });
    });

    const generateReportBtn = document.getElementById('generateReportBtn');
    generateReportBtn.addEventListener('click', () => {
        const report = [];
        const basePrices = {
            '1': 1000,
            '2': 1000,
            '3': 1000,
            '4': 800,
            '5': 800,
            '6': 800,
            '7': 1000,
            '8': 1000,
            '9': 1000
        };

        const calculateSeatPrice = (seatId) => {
            const row = parseInt(seatId.split('-')[1][0]);
            const position = seatId.split('-')[1][1];
            let price = basePrices[row];

            if (row === 1 || row === 9) {
                if (position >= 'A' && position <= 'J') {
                    price *= 1.5;
                }
            } else if (row === 2 || row === 8 || row === 5) {
                if (position >= 'A' && position <= 'J') {
                    price *= 0.8;
                }
            }

            if (position === 'D' || position === 'E' || position === 'F') {
                price *= 1.05;
            }

            return price;
        };

        const tableBody = document.createElement('tbody');
        seats.forEach(seat => {
            const seatId = seat.id;
            const clients = JSON.parse(localStorage.getItem('clients')) || {};
            const clientName = clients[seatId] || 'Disponível';
            const price = calculateSeatPrice(seatId);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${seatId}</td>
                <td>${clientName}</td>
                <td>R$ ${price.toFixed(2)}</td>
            `;

            tableBody.appendChild(row);

            report.push({
                Assento: seatId,
                Cliente: clientName,
                Valor: `R$ ${price.toFixed(2)}`
            });
        });

        const reportHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Relatório de Assentos</title>
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
                <style>
                    .search-box {
                        margin-bottom: 10px;
                    }
                    body {
                        margin: 0;
                        background-image: linear-gradient(to bottom, #010b1a, #003b53, #006f71, #00a464, #36cfae);
background-repeat: no-repeat;
min-height:100%;
background-attachment: fixed;
    color: black;
    font-family: "Roboto Condensed", sans-serif;
     font-weight:bold;
         line-height: 30px;
  
                    }

                    table {
                        
                        border-collapse: collapse;
                        width: 90%;
                    }
                    td {
                        color: white;
                    }
                    th, td {
                        
                        text-align: center;
                        padding: 8px;
                        font-size: 20px;
                        border:solid 1px;
                        border-color: white;

                    }
                    tr {
                        border-radius: 10px;
                    }
                    th {
                        background-color: #ffffff;
                    }
                    .cinema-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center; 
                        padding: 20px;
                        border-radius: 10px;
                    background-image:url("fundoffjfh.png");
                        width:87%;
                         box-shadow: rgba(0, 0, 0, 0.6) 0px 5px 15px;
                    }
                    
                    .screen {
                        width: 100%;
                        height: 34px;
                        background-color: rgb(255, 255, 255);
                         font-family: "Roboto Condensed", sans-serif;
                         font-weight:bold;
                        margin-bottom: 20px;
                        text-align: center;
                        line-height: 30px;
                        font-size: 26px;
                        color: black;
                        border-radius: 5px;
                        
                    }

                    /* this is a recreation of twitter search in css */
.form {
  --input-text-color: #fff;
  --input-bg-color: transparent;
  --focus-input-bg-color: transparent;
  --text-color: #949faa;
  --active-color: #1b9bee;
  --width-of-input: 200px;
  --inline-padding-of-input: 1.2em;
  --gap: 0.9rem;
}
/* form style */
.form {
  font-size: 1.2rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: var(--width-of-input);
  position: relative;
  isolation: isolate;
}
/* a fancy bg for showing background and border when focus. */
.fancy-bg {
  position: absolute;
  width: 100%;
  inset: 0;
  background: var(--input-bg-color);
  border-radius: 30px;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
/* label styling */
label {
  width: 100%;
  padding: 0.8em;
  padding-inline: var(--inline-padding-of-input);
  display: flex;
  align-items: center;
}

.search,.close-btn {
  position: absolute;
}
/* styling search-icon */
.search {
  fill: var(--text-color);
  left: var(--inline-padding-of-input);
}
/* svg -- size */
svg {
  width: 17px;
  display: block;
}
/* styling of close button */
.close-btn {
  border: none;
  right: var(--inline-padding-of-input);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 0.1em;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--active-color);
  opacity: 0;
  visibility: hidden;
}
/* styling of input */
.input {
  color: var(--input-text-color);
  width: 100%;
  margin-inline: min(2em,calc(var(--inline-padding-of-input) + var(--gap)));
  background: none;
  font-size: 20px;
  border: none;
}

.input:focus {
  outline: none;
}

.input::placeholder {
  color: var(--text-color)
}
/* input background change in focus */
.input:focus ~ .fancy-bg {
  border: 1px solid var(--active-color);
  background: var(--focus-input-bg-color);
}
/* search icon color change in focus */
.input:focus ~ .search {
  fill: var(--active-color);
}
/* showing close button when typing */
.input:valid ~ .close-btn {
  opacity: 1;
  visibility: visible;
}
/* this is for the default background in input,when selecting autofill options -- you can remove this code if you do not want to override the browser style.  */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
  -webkit-transition-delay: 9999s;
}

.btn2{
    background-color: rgba(34, 34, 34, 0);
    border-radius: 0px;
}


button {
    font-family: "Poetsen One", sans-serif;
  font-weight: 400;
  font-style: normal;
  background-color: #222;
  border-radius: 10px;
  border-style: none;
    margin-left: 20px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 25px;
  line-height: 1.5;
  max-width: none;
  min-height: 44px;
  min-width: 20px;
  outline: none;
  overflow: hidden;
  padding: 0px 0px 0px;

  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

button:hover,
button:focus {
  opacity: .75;
}
                </style>
            </head>
            
            <body>
            <button class="btn2" onclick="history.back()">Sair</button>
            <center>
            
            <div class="cinema-container">
            
            <div class="screen">Relatório de Assentos</div>
            <form class="form">
            <label for="search">
                <input class="input" id="searchInput" class="search-box" placeholder="Buscar">
                <div class="fancy-bg"></div>
                <div class="search">
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr">
                        <g>
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                    </svg>
                </div>
            </label>
        </form><br>
                <table>
                    <thead>
                        <tr>
                            <th>Assento</th>
                            <th>Cliente</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    ${tableBody.outerHTML}
                </table>
                <br>
                <script>
                    document.getElementById('searchInput').addEventListener('keyup', function() {
                        const searchValue = this.value.toLowerCase();
                        const rows = document.querySelectorAll('tbody tr');

                        rows.forEach(row => {
                            const seatId = row.cells[0].textContent.toLowerCase();
                            const clientName = row.cells[1].textContent.toLowerCase();

                            if (seatId.includes(searchValue) || clientName.includes(searchValue)) {
                                row.style.display = '';
                            } else {
                                row.style.display = 'none';
                            }
                        });
                    });
                </script>
                </div>
                <br>
                </center>
            </body>
            </html>
        `;

        const blob = new Blob([reportHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        const confirmMsg = 'Deseja visualizar o relatório completo?';
        if (confirm(confirmMsg)) {
            window.location.href = url;
            console.log(report);
            alert('Relatório gerado. Verifique a nova página para visualizá-lo.');
        }
    });
});

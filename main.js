console.log("This is working.");

const tableBody = document.querySelector("tbody"); // Move this line outside the populate function

const populate = async (base, value) => {
  let myStr = "";
  const baseUrl = "https://api.currencyapi.com/v3/latest";
  const apiKey = "cur_live_9gqluepiO7rQidbRABMfFjctxT6OHMw2cNoCCBxp";
  const baseCurrency = "USD"; // You can set the default base currency here

  const url = `${baseUrl}?apikey=${apiKey}&base=${baseCurrency}`;

  let response = await fetch(url);
  let rJson = await response.json();

  for (let key of Object.keys(rJson["data"])) {
    myStr += `<tr>
                     <td>${key}</td>
                     <td>${rJson["data"][key]["code"]}</td>
                     <td>${rJson["data"][key]["value"] * value}</td>
                </tr>`;
  }

  // Update the table with the generated data
  tableBody.innerHTML = myStr;
};

const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
  e.preventDefault();

  const value = parseInt(
    document.querySelector("input[name='quantity']").value
  );
  const currency = document.querySelector("select[name='currency']").value;
  populate(currency, value); // Pass the currency and value to the populate function
});

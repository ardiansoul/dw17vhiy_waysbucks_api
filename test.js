var request = require("request");
var fs = require("fs");
var options = {
  method: "POST",
  url: "http://localhost:5000/api/v1/transactions",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA3MjI5OTQ1fQ.yd0kT_5MMvinsjUtOopli9oYDZWsI9CxSAWpGuwrbig",
  },
  formData: {
    userId: "1",
    name: "rendiaria",
    email: "negatif@gmail.com",
    phone: "0895369569314",
    address: "jalan raya cisoka",
    posCode: "12730",
    status: "Success",
    income: "24000",
    products: [
      { productId: 1, amount: 1, toping: [1, 2, 3] },
      { productId: 1, amount: 1, toping: [1, 2, 3] },
    ],
    attachment: {
      value: fs.createReadStream(
        "/C:/Users/Desktop/Pictures/9786026232748_Belajar-Singkat-PHP-7-CD__w414_hauto.jpg"
      ),
      options: {
        filename:
          "/C:/Users/Desktop/Pictures/9786026232748_Belajar-Singkat-PHP-7-CD__w414_hauto.jpg",
        contentType: null,
      },
    },
  },
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

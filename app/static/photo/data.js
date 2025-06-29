var data = [];

var dataStr = "mix1<br><br>Photographer Mix<br><br><br>\
mix2<br><br>Sleeping Mix<br><br><br>\
mix3<br><br>Model Mix<br><br><br>\
mix4<br><br>Angry Mix<br><br><br>\
mix5<br><br>Happy Mix<br><br><br>\
mix6<br><br>Pretty Mix<br><br><br>\
mix7<br><br>Gangster Mix<br><br><br>\
mix8<br><br>Sunflower Mix<br><br><br>\
mix9<br><br>Wow Mix<br><br><br>\
mix10<br><br>Scary Mix<br><br><br>\
mix11<br><br>Rajnikanth Mix<br><br><br>\
mix12<br><br>Fat Mix<br><br><br>";

var wishes = [
  "May this year bring you as much joy as you bring to others every day!",
  "You make the world brighter just by being in it. Happy Birthday!",
  "Keep being beautiful inside and out. Life loves you!",
  "You’re not just special today—you’re special every single day.",
  "A heart like yours deserves nothing but happiness and magic!",
  "Your smile is contagious, your soul inspiring. Stay that way!",
  "To the strongest, softest, most stunning soul I know—cheers!",
  "May love and laughter be your constant companions.",
  "Life’s more colorful with you in it. Shine on!",
  "This is your story. Make it legendary!",
  "To someone unforgettable—Happy Birthday, always!",
  "You are deeply loved, endlessly appreciated, and forever cherished."
];

var d = dataStr.split("<br><br><br>");
for (var i = 0; i < d.length - 1; i++) {
  var c = d[i].split("<br><br>");
  data.push({
    img: "/static/photo/" + c[0] + ".jpg",

    caption: c[1],
    wish: wishes[i]
  });
}

// Assuming your HTML has a container like <div id="gallery"></div>
var container = document.getElementById("gallery");

data.forEach(item => {
  var card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="inner">
      <div class="front">
        <img src="${item.img}" alt="${item.caption}">
        <div class="caption">${item.caption}</div>
      </div>
      <div class="back">
        ${item.wish}
      </div>
    </div>
  `;
  container.appendChild(card);
});

document.addEventListener("DOMContentLoaded", () => {
  // Event listener to the "Solve Room 1" button
  document.getElementById("solveRoom1").addEventListener("click", () => {
    fetch("books.json")
      .then((response) => response.json()) 
      .then((books) => {
        const mostRecentBook = findMostRecentBook(books); // Find the most recent book Display the title of the most recent book in the "resultRoom" element
        document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`;
      });
  });

  document.getElementById("solveRoom2").addEventListener("click", () => {
    const jsConcepts = new Set(["closure","scope","hoisting","prototypes","this","event loop",]);
    const reactConcepts = new Set(["components", "jsx", "hooks", "async"]);
    // Find the common concepts between the two sets and display them in the "resultRoom" element
    const commonConcepts = findIntersection(jsConcepts, reactConcepts);
    document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(", ")}`;
  });

  document.getElementById("solveRoom3").addEventListener("click", async () => {
    fetch("directions.json")
      .then((response) => response.json())
      .then((directions) => {navigateLabyrinth(directions)
        // Display the message in the "room3Result" element
        .then((message) => {
          document.getElementById("room3Result").textContent = message;
        });
      });
  });
});

function findMostRecentBook(books) {
  // Returns the most recent book
  return books.reduce((mostRecent, book) => new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent);
}

function findIntersection(setA, setB) {
  // Create a new set populated with the intersection of two sets
  const intersection = new Set([...setA].filter((propertry) => setB.has(propertry)));
  return intersection;
}

async function navigateLabyrinth(directions) {
  // 🟥 Extra feature: Loader animation
  const loader = document.createElement("div");
  loader.style.width = "32px";
  loader.style.height = "32px";
  loader.style.display = "flex";
  loader.style.margin = "auto";
  loader.style.border = "4px solid #ccc";
  loader.style.borderTopColor = "#333";
  loader.style.borderRadius = "50%";
  loader.style.animation = "spin 2s linear infinite";
  document.getElementById("room3Result").appendChild(loader);

  for (let direction of directions) {
    // Wait for 1 second before simulating the next step
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Navigating: ${direction.step}`);
  }
  return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}

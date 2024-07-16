// Constant to store the API base URL for fetching puppy roster data
const baseUrl = "https://fsa-puppy-bowl.herokuapp.com/api/2406-FTB-ET-WEB-FT/players";

// Get a reference to the button element with the ID "view-roster-btn"
const rosterButton = document.getElementById("view-roster-btn");

// Asynchronous function to fetch the puppy roster data
const getRoster = async () => {
  try {
    // Fetch data from the API endpoint
    const response = await fetch(baseUrl);

    // Parse the JSON response from the API
    const data = await response.json();

    // Check if the API call was successful
    if (data.success) {
      // Extract the players data array from the response
      const players = data.data.players;

      // Render the roster using the fetched player data
      renderRoster(players);
    } else {
      // Log an error message if the API call failed, including the error details
      console.error("Error fetching roster:", data.error);
    }
  } catch (error) {
    // Log an error message in case of any unexpected issues during fetch
    console.error("Error fetching roster:", error);
  }
};

// Function to render the puppy roster on the page
const renderRoster = (players) => {
  // Get a reference to the HTML element where the roster will be displayed
  const rosterElement = document.getElementById("roster");

  // Clear any previously displayed roster content
  rosterElement.innerHTML = "";

  // Loop through each player in the data array and render their card
  players.forEach(renderPlayerCard);
};

// Function to render a single player card on the roster
const renderPlayerCard = (player) => {
  // Create a list item (li) element to represent the player card
  const playerCard = document.createElement("li");

  // Set the inner HTML of the player card with player image, name, breed, and status
  playerCard.innerHTML = `
   <img src="${player.imageUrl}" alt="${player.name } ">
  <ul>
    <li><strong>Name:</strong> ${player.name}</li>
    <li><strong>Breed:</strong> ${player.breed ? player.breed + ' ' : 'N/A'}</li>
    <li><strong>Status:</strong> ${player.status ? player.status + ' ' : 'Unknown'}</li>
  </ul>
`;
  // Add a class for styling 
  playerCard.classList.add("player-card");  // Add the class "player-card" for styling

  // Add an event listener to the player card for clicking, which will trigger showing details for that player
  playerCard.addEventListener("click", () => showPlayerDetails(player.id));

  // Append the player card to the roster container
  document.getElementById("roster").appendChild(playerCard);
};

// Asynchronous function to fetch and display details for a specific player
const showPlayerDetails = async (playerId) => {
  try {
    // Construct the API URL to fetch details for a specific player using their ID
    const url = `${baseUrl}/${playerId}`;

    // Fetch data from the API endpoint for the specific player
    const response = await fetch(url);

    // Parse the JSON response from the API
    const data = await response.json();

    // Check if the API call was successful
    if (data.success) {
      // Extract the player data object from the response
      const player = data.data;

      // Render the player details on the page using a separate function 
      renderPlayerDetails(player);

      // Hide the roster container
      document.getElementById("roster").style.display = "none";

      // Show the player details container 
      document.getElementById("player-details").style.display = "block";
    } else {
      // Log an error message if the API call failed, including the error details
      console.error("Error fetching player details:", data.error);
    }
  } catch (error) {
    // Log an error message in case of any unexpected issues during fetch
    console.error("Error fetching player details:", error);
  }
};
rosterButton.addEventListener("click", getRoster);

// const switchToggle = document.getElementById('theme-switch');
// const body = document.body;

// // Check if user previously selected dark mode
// if (localStorage.getItem('theme') === 'dark') {
//   body.classList.add('dark-mode');
//   switchToggle.checked = true;
// }

// switchToggle.addEventListener('change', () => {
//   body.classList.toggle('dark-mode');
//   localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
// });

// document.addEventListener("DOMContentLoaded", function () {

//   const searchButton = document.getElementById("searchbtn");
//   const usernameInput = document.getElementById("user-input");
//   const statsContainer = document.querySelector(".stats-container");
//   const easyProgressCircle = document.querySelector(".easy-progress");
//   const mediumProgressCircle = document.querySelector(".medium-progress");
//   const hardProgressCircle = document.querySelector(".hard-progress");
//   const easyLabel = document.getElementById("easy-label");
//   const mediumLabel = document.getElementById("medium-label");
//   const hardLabel = document.getElementById("hard-label");
//   const cardStatsContainer = document.querySelector(".stats-card");

//   let lastFetchTime = 0;
//   const cache = {}; // local cache

//   function validateUsername(username) {
//     if (username.trim() == "") {
//       alert("Username should not be empty");
//       return false;
//     }

//     const regex = /^[a-zA-Z0-9_-]{1,15}$/;
//     const isMatching = regex.test(username);
//     if (!isMatching) {
//       alert("Invalid Username");
//     }
//     return isMatching;
//   }

//   async function fetchWithRetry(url, options, retries = 3) {
//     for (let i = 0; i < retries; i++) {
//       const response = await fetch(url, options);

//       if (response.status === 429) {
//         const waitTime = (i + 1) * 2000; // wait longer each retry
//         await new Promise(resolve => setTimeout(resolve, waitTime));
//         continue;
//       }

//       return response;
//     }
//     throw new Error("Too many requests. Try again later.");
//   }

//   async function fetchUserDetails(username) {
//     const now = Date.now();
//     if (now - lastFetchTime < 3000) {
//       alert("Please wait a few seconds before searching again.");
//       return;
//     }
//     lastFetchTime = now;

//     if (cache[username]) {
//       console.log("Using cached data");
//       displayUserData(cache[username]);
//       return;
//     }

//     try {
//       searchButton.textContent = "Searching ..";
//       searchButton.disabled = true;

//       const proxyUrl = 'http://localhost:8010/proxy/graphql/';
//       const targetUrl = 'https://leetcode.com/graphql/';

//       const myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");
//       myHeaders.append("Cache-Control", "no-cache");

//       const graphql = JSON.stringify({
//         query: `
//           query userSessionProgress($username: String!) {
//             allQuestionsCount {
//               difficulty
//               count
//             }
//             matchedUser(username: $username) {
//               submitStats {
//                 acSubmissionNum {
//                   difficulty
//                   count
//                   submissions
//                 }
//                 totalSubmissionNum {
//                   difficulty
//                   count
//                   submissions
//                 }
//               }
//             }
//           }
//         `,
//         variables: { "username": username }
//       });

//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: graphql,
//         cache: "no-store",
//         redirect: "follow"
//       };

//       const response = await fetchWithRetry(proxyUrl + targetUrl, requestOptions);

//       if (!response.ok) {
//         throw new Error("Unable to fetch user details.");
//       }

//       const parsedData = await response.json();

//       if (!parsedData.data.matchedUser) {
//         statsContainer.innerHTML = "<p>User not found</p>";
//         return;
//       }

//       cache[username] = parsedData;
//       displayUserData(parsedData);

//     } catch (error) {
//       console.error(error);
//       statsContainer.innerHTML = "<p>No data found</p>";
//       alert(error.message || "Something went wrong!");
//     } finally {
//       searchButton.textContent = "Search";
//       searchButton.disabled = false;
//     }
//   }

//   function updateProgress(solved, total, label, circle) {
//     const progressDegree = (solved / total) * 100;
//     circle.style.setProperty("--progress-degree", `${progressDegree}%`);
//     label.textContent = `${solved}/${total}`;
//   }

//   function displayUserData(parsedData) {
//     const totalCounts = parsedData.data.allQuestionsCount;
//     const acData = parsedData.data.matchedUser.submitStats.acSubmissionNum;
//     const totalData = parsedData.data.matchedUser.submitStats.totalSubmissionNum;

//     const totalEasyQues = totalCounts.find(q => q.difficulty === "Easy")?.count || 0;
//     const totalMediumQues = totalCounts.find(q => q.difficulty === "Medium")?.count || 0;
//     const totalHardQues = totalCounts.find(q => q.difficulty === "Hard")?.count || 0;

//     const solvedTotalEasyQues = acData.find(q => q.difficulty === "Easy")?.count || 0;
//     const solvedTotalMediumQues = acData.find(q => q.difficulty === "Medium")?.count || 0;
//     const solvedTotalHardQues = acData.find(q => q.difficulty === "Hard")?.count || 0;

//     updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
//     updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
//     updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);

//     const cardData = [
//       { label: "Overall Submissions", value: totalData[0].submissions },
//       { label: "Overall Easy Submissions", value: totalData[1].submissions },
//       { label: "Overall Medium Submissions", value: totalData[2].submissions },
//       { label: "Overall Hard Submissions", value: totalData[3].submissions },
//     ];

//     cardStatsContainer.innerHTML = cardData.map(data => `
//       <div class="card">
//         <h4>${data.label}</h4>
//         <p>${data.value}</p>
//       </div>`).join("");
//   }

//   searchButton.addEventListener("click", function () {
//     const username = usernameInput.value.trim();
//     console.log("Logging In Username:", username);
//     if (validateUsername(username)) {
//       fetchUserDetails(username);
//     }
//   });
// });


const switchToggle = document.getElementById('theme-switch');
const body = document.body;

// Check if user previously selected dark mode
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  switchToggle.checked = true;
}

switchToggle.addEventListener('change', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchbtn");
  const usernameInput = document.getElementById("user-input");
  const statsContainer = document.querySelector(".stats-container");
  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");
  const easyLabel = document.getElementById("easy-label");
  const mediumLabel = document.getElementById("medium-label");
  const hardLabel = document.getElementById("hard-label");
  const cardStatsContainer = document.querySelector(".stats-card");

  function validateUsername(username) {
    if (username.trim() == "") {
      alert("Username should not be empty");
      return false;
    }

    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
      alert("Invalid Username");
    }
    return isMatching;
  }

  async function fetchUserDetails(username) {
    try {
      searchButton.textContent = "Searching ..";
      searchButton.disabled = true;

      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const targetUrl = 'https://leetcode.com/graphql/';

      const myHeaders = new Headers();
      myHeaders.append("content-type", "application/json");

      const graphql = JSON.stringify({
        query: `
          query userSessionProgress($username: String!) {
            allQuestionsCount {
              difficulty
              count
            }
            matchedUser(username: $username) {
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
                totalSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
            }
          }
        `,
        variables: { username: username }
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow"
      };

      const response = await fetch(proxyUrl + targetUrl, requestOptions);

      if (!response.ok) {
        throw new Error("Unable to fetch the user details");
      }

      const parsedData = await response.json();
      console.log("Logging data: ", parsedData);

      displayUserData(parsedData);

    } catch (error) {
      statsContainer.innerHTML = "<p>No data found</p>";
    } finally {
      searchButton.textContent = "Search";
      searchButton.disabled = false;
    }
  }

  function updateProgress(solved, total, label, circle) {
    const progressDegree = (solved / total) * 100;
    circle.style.setProperty("--progress-degree", `${progressDegree}%`);
    label.textContent = `${solved}/${total}`;
  }

  function displayUserData(parsedData) {
    const allQuestions = parsedData.data.allQuestionsCount;
    const acSubmissions = parsedData.data.matchedUser.submitStats.acSubmissionNum;
    const totalSubmissions = parsedData.data.matchedUser.submitStats.totalSubmissionNum;

    const totalEasyQues = allQuestions[1].count;
    const totalMediumQues = allQuestions[2].count;
    const totalHardQues = allQuestions[3].count;

    const solvedTotalEasyQues = acSubmissions[1].count;
    const solvedTotalMediumQues = acSubmissions[2].count;
    const solvedTotalHardQues = acSubmissions[3].count;

    updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
    updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
    updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);

    const cardData = [
      {
        label: "Overall Submissions",
        value: totalSubmissions[0].submissions
      },
      {
        label: "Overall Easy Submissions",
        value: totalSubmissions[1].submissions
      },
      {
        label: "Overall Medium Submissions",
        value: totalSubmissions[2].submissions
      },
      {
        label: "Overall Hard Submissions",
        value: totalSubmissions[3].submissions
      }
    ];

    console.log("card data:", cardData);

    cardStatsContainer.innerHTML = cardData.map(data => {
      return `
        <div class="card">
          <h4>${data.label}</h4>
          <p>${data.value}</p>
        </div>
      `;
    }).join("");
  }

  searchButton.addEventListener("click", function () {
    const username = usernameInput.value;
    console.log("Logging In Username:", username);
    if (validateUsername(username)) {
      fetchUserDetails(username);
    }
  });
});


# 📊 LeetMetrics - LeetCode Progress Tracker

**LeetMetrics** is a minimalistic web application that tracks any LeetCode user's progress using real-time data. It displays problems solved by difficulty and submission statistics with intuitive visualizations.

---

## 🚀 Features

- 🔎 **Username-based lookup** for real-time LeetCode stats
- 📊 **Pie charts** to show solved problems by difficulty (Easy/Medium/Hard)
- 📋 Total and difficulty-wise **submission counts**
- 🌙 **Dark mode toggle** for a better user experience
- ⚡ Uses **LeetCode’s GraphQL API** (via CORS proxy) for live data
- 💻 **Responsive UI** optimized for all devices

---

### 🌤 Light Mode

<img width="2879" height="1359" alt="Screenshot 2025-07-26 170320" src="https://github.com/user-attachments/assets/5754cfac-6974-489d-b71e-9ec126b362a6" />

<img width="2875" height="1389" alt="Screenshot 2025-07-26 170302" src="https://github.com/user-attachments/assets/b2c0b2df-0736-4965-9979-6c9a0f8d9502" />


### 🌙 Dark Mode
<img width="2877" height="1399" alt="image" src="https://github.com/user-attachments/assets/10551f1f-d424-476f-a3db-8f7282355eb8" />

<img width="2879" height="1394" alt="image" src="https://github.com/user-attachments/assets/ec184b16-fad1-4466-b2d5-12076b07691e" />


---

## 🛠️ Tech Stack

- **Frontend**: HTML,CSS,JavaScript
- **Styling**: CSS 
- **Data Source**: LeetCode GraphQL API
- **CORS Handling**: `cors-anywhere` proxy

---

## 🧠 How It Works
- User inputs their LeetCode username
- A POST request is made to LeetCode’s GraphQL API through a CORS proxy
- The response returns problem stats and submission counts
- Data is rendered into pie charts and stat blocks dynamically.

---

## 🙋‍♀️ About
Made with 💙 by Vishakha Sharma

Feel free to contribute, suggest ideas, or raise issues!

# Project: CARTO GEO

**CARTO GEO** is an interactive map project that provides real-time geospatial data visualization. With this tool, you can explore dynamic maps, load geographic data

---

## Features

### General Features
- **Interactive Maps:** Load and visualize geospatial data dynamically.
- **Real-time Rendering:** High-performance visualization with live updates.
- **Drag-and-Drop Nodes:** Add, connect, and remove nodes using an intuitive drag-and-drop interface.
- **Diagram Persistence:** Save and load the diagram state from local storage.
- **Custom Nodes:**
  - **Source Node:** Includes an input field (`url`) for entering free-form text and a source port.
  - **Layer Node:** Includes a target port for mapping layers.

### Map Integration
- **Dynamic Map Visualization:** The map reflects the nodes defined in the diagram, rendering layers in their vertical order.
- **Hover Tooltips:** Display properties for each geometry directly on the map.
- **View Transition System:** Seamlessly switch between the map view and the diagram editor using `Map` and `Back` buttons.

---

## Images

Here are some screenshots showcasing the interface and map views:

### Home Screenshots

<div align="center">
  <p><strong>Home View - 1</strong></p>
  <img width="600" src="https://github.com/user-attachments/assets/7e66e168-966d-4482-a274-cfa29d6a27c7" alt="Home Screenshot 1">
  
  <p><strong>Home View - 2</strong></p>
  <img width="600" src="https://github.com/user-attachments/assets/ad77ec0a-bed1-440c-94f0-4025cf9867c0" alt="Home Screenshot 2">
</div>

### Map Screenshots

<div align="center">
  <p><strong>Map View - 1</strong></p>
  <img width="600" src="https://github.com/user-attachments/assets/f52c96ba-9b44-47f5-a19b-8d3ce749fe5d" alt="Map Screenshot 1">
  
  <p><strong>Map View - 2</strong></p>
  <img width="600" src="https://github.com/user-attachments/assets/119e93da-f3e9-4b09-8402-aaadad997289" alt="Map Screenshot 2">
</div>

---

## Installation

To set up the project on your local machine, follow these steps:

```bash
npm install
npm run dev


VITE_MAP_BOX_API_KEY=key 


Here there are some sources you can use to play around:

```
https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/san-francisco.geojson
https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson
https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/chicago.geojson
https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart.geo.json
```
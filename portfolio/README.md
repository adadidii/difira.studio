# Portfolio for /studio

`portfolio.json` drives the showreel and the "Selected work" grid on `/studio`.
Paths are relative to this folder. Cards only appear for items with both `src` and `title`;
the grid section stays hidden while `items` is empty, and the showreel shows a
"Showreel coming soon" frame while `showreel.src` is empty.

```json
{
  "showreel": { "src": "showreel.mp4", "poster": "showreel.png" },
  "items": [
    {
      "src": "my-video.mp4",
      "poster": "my-video.png",
      "title": "Video title",
      "description": "One line about the video.",
      "duration": "0:30"
    }
  ]
}
```

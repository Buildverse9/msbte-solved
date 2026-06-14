const { JSDOM } = require('jsdom');
const html = `
<!DOCTYPE html>
<html>
<body>
  <script>
    console.log('Script loaded, readyState:', document.readyState);
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOMContentLoaded fired!');
    });
  </script>
</body>
</html>
`;
const dom = new JSDOM(html, { runScripts: "dangerously" });

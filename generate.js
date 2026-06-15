const fs = require('fs');
const text = fs.readFileSync('uploads/parsed.txt', 'utf8');
const chunks = text.split('PRACTICAL NO.');
const allBranches = ['computer', 'it', 'civil', 'mech', 'electrical', 'etc'];
let articles = [];

for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i].trim();
    if (!chunk) continue;

    const firstLineEnd = chunk.indexOf('\n');
    let titleLine = chunk;
    let body = '';
    if (firstLineEnd !== -1) {
        titleLine = chunk.substring(0, firstLineEnd).trim();
        body = chunk.substring(firstLineEnd).trim();
    }

    let practicalNum = i;
    const match = titleLine.match(/^(\d+):\s*(.*)/);
    let title = 'Practical ' + i;
    if (match) {
        practicalNum = parseInt(match[1], 10);
        title = match[2].trim();
    } else {
        title = titleLine.replace(/^:/, '').trim();
    }

    const paragraphs = body.split('\n').map(p => p.trim()).filter(p => p);
    let htmlContent = '';
    paragraphs.forEach(p => {
        if (p.endsWith(':')) {
            htmlContent += '<h3>' + p + '</h3>';
        } else if (/^\d+\./.test(p)) {
            htmlContent += '<div style="margin-left: 20px; padding: 4px 0;">' + p + '</div>';
        } else {
            htmlContent += '<p>' + p + '</p>';
        }
    });

    const newArticle = {
        id: Date.now().toString() + '-' + i,
        branches: allBranches,
        semester: 1,
        subject: '311303',
        practical: practicalNum,
        title: title,
        tags: ['Communication Skills', 'English', 'Practical ' + practicalNum],
        content: htmlContent,
        updatedAt: new Date().toISOString()
    };

    articles.push(newArticle);
}

fs.writeFileSync('data/articles.json', JSON.stringify(articles, null, 2));
console.log('Successfully generated ' + articles.length + ' articles!');

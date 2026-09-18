const fs = require('fs');
const path = '/home/subhashreelenka/VEYRA/applications/backend-api/src/ai/ai.service.ts';
let code = fs.readFileSync(path, 'utf8');

const regex = /const geminiPayload = \{ \.\.\.payload, model: 'gemini-2\.5-pro' \};[\s\S]*?if \(text\) \{/;

const replacement = `const geminiContents = payload.messages.filter(m => m.role !== 'system').map(m => {
          let parts = [];
          if (Array.isArray(m.content)) {
            parts = m.content.map(c => {
              if (c.type === 'text') return { text: c.text };
              if (c.type === 'image_url') {
                const url = c.image_url.url;
                const mimeType = url.substring(url.indexOf(':') + 1, url.indexOf(';'));
                const data = url.substring(url.indexOf(',') + 1);
                return { inlineData: { mimeType, data } };
              }
            });
          } else {
            parts = [{ text: m.content }];
          }
          return { role: m.role, parts };
        });

        const systemMsg = payload.messages.find(m => m.role === 'system');
        const systemInstruction = systemMsg ? { parts: [{ text: systemMsg.content }] } : undefined;

        const nativePayload = {
          contents: geminiContents,
          generationConfig: {
            responseMimeType: "application/json"
          }
        };
        if (systemInstruction) nativePayload.systemInstruction = systemInstruction;

        let res;
        for (let attempt = 1; attempt <= 3; attempt++) {
          res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=\${geminiKey}\`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(nativePayload)
          });

          if (res.ok) break;
          
          const errorText = await res.text();
          this.logger.warn(\`Gemini attempt \${attempt} failed with status \${res.status}: \${errorText}\`);
          
          if (res.status === 503 && attempt < 3) {
            this.logger.log(\`Waiting 2 seconds before retry \${attempt + 1}...\`);
            await new Promise(r => setTimeout(r, 2000));
          } else {
            break;
          }
        }

        if (res && res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {`;

code = code.replace(regex, replacement);
fs.writeFileSync(path, code);

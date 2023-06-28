require('dotenv').config()
const Imap = require('imap');
const fs = require('fs');
const {simpleParser} = require('mailparser');

const imap = new Imap({
  user: process.env.EMAIL,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false
  }
});

imap.once('ready', function() {
  console.log('Connected to IMAP server');

  imap.openBox('INBOX', true, function(err, box) {
    if (err) throw err;

    console.log(`Total messages in INBOX: ${box.messages.total}`);

    imap.on('mail', function(numNewMsgs) {
      console.log(`New email received: ${numNewMsgs} new messages`);

      // Son e-postayı al
      const f = imap.seq.fetch(box.messages.total, { bodies: [''] });
      f.on('message', function(msg, seqno) {

        msg.on('body', function(stream, info) {

          var buffer = '';
          stream.on('data', function(chunk) {
            buffer += chunk.toString('utf8');
          });
          stream.once('end', function() {
            simpleParser(buffer, async (err, email) => {
              console.log(email);
              console.log(email.text.split('>')[0]);
              email.attachments.forEach((attachment) => {
                const filePath = './downloads/' + attachment.filename;
                const fileStream = fs.createWriteStream(filePath);
                fileStream.write(attachment.content);
                fileStream.end();
                console.log(`Ek "${filePath}" dosyaya kaydedildi.`);
              });
            });
          });
        });
      });
    });
  });
});

imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
});

imap.connect();
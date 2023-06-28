
# Gmail Imap Listener

This code block allows you to read emails and download their attachments via your Gmail account using Node.js. 

The code connects to the Gmail server using the IMAP protocol and tracks new emails.

 The body and attachments of the emails are parsed using the mailparser module and the files are downloaded. 

You can use this code to track incoming emails and download their attachments from your Gmail account.



## Requirements
Node.js


## Environments

Open the `.env.example` file and fill in the email and password fields

Note: You need an app password for the application, your normal user password will not work, if you do not know how to generate your app password, [helpful link click me.](https://support.google.com/mail/thread/205453566/how-to-generate-an-app-password?hl=en)

```bash
  EMAIL=
  PASSWORD=
  HOST=imap.gmail.com
  PORT=993
```
Rename the file `.env.example` with `.env`

  
## Run it on your computer

Clone the project

```bash
  git clone https://github.com/Hasqer/gmail-imap-listener.git
```

Go to the project directory

```bash
  cd gmail-imap-listener
```

Install required packages

```bash
  npm install
```

Run the server

```bash
  node server
```
Emails received after this time will be written to the console and attachments will be saved in the `downloads` folder.

  

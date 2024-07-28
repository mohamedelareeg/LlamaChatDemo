# llama3.1
Watch the demo Video:



[![Llama 3.1 Introduction](https://img.youtube.com/vi/T2oc9VgBLeU/0.jpg)](https://www.youtube.com/watch?v=T2oc9VgBLeU&feature=youtu.be)

## Overview

This project sets up a web application where users can interact with the Llama 3.1 model via a simple chat interface. The chat interface uses JavaScript and asynchronous API calls to send messages to the Llama inference server and display responses.


## Installation Guide

### Downloading Ollama

1. **Download Ollama**
   - Obtain the Ollama toolkit from the official [Ollama website](https://ollama.com/download).

2. **Choose Your Operating System**
   - Ollama is available for download on Mac, Windows, and Linux operating systems. Select the version appropriate for your OS.

3. **For Mac Users**
   - Once downloaded, move the Ollama application to the **Applications** folder.
   - You can do this by dragging the Ollama icon to the Applications folder in Finder.

4. **For Windows Users**
   - Run the installer you downloaded and follow the on-screen instructions to complete the installation.
   - Ollama will typically be installed in the **Program Files** directory.

5. **For Linux Users**
   - Extract the downloaded package and follow the provided installation instructions or use your distribution’s package manager if applicable.

6. **Ollama is Ready to Use**
   - After downloading and moving Ollama to the correct location, it is ready to be used. You can verify the installation by running `ollama --version` in your terminal or command prompt.

### Installing and Running Llama 3.1 8b

1. **Open Terminal**
   - Open your terminal or command prompt based on your operating system.

2. **Run the Llama 3.1 8b Model**
   - Execute the following command to install and run the Llama 3.1 8b model locally:

     ```bash
     ollama run llama3.1:8b
     ```

   - This command will start the Llama 3.1 model with 8 billion parameters. Ensure that the model download is complete and the server is running before making API requests.

### Verification

- **Check Model Status**
  - You can verify that the Llama model is running by checking the output in your terminal. It should indicate that the model server is active and listening for requests.

- **Access the API**
  - Once the model is running, you can access the API at `http://localhost:11434/api/chat` and start interacting with it using the provided cURL commands or through your application.

### Using the Chat Interface

You can interact with the Llama model through the provided web interface. Here's how you can send a message to the model:

1. **Enter your message** in the textarea and click the send button or press Enter.
2. The message will be sent to the Llama API and a response will be displayed in the chat window.

### Accessing the API Using cURL

You can also interact with the Llama inference server using cURL. Below is an example command to send a message to the Llama model:

```bash
curl http://localhost:11434/api/chat -d '{
    "model": "llama3.1:8b",
    "messages": [
        { "role": "user", "content": "What are God Particles?" }
    ],
    "stream": false
}'
```

For any issues or additional support, refer to the [Ollama documentation](https://ollama.com/docs) or open an issue on the GitHub repository.
### Explanation of Parameters (continued):

- **`http://localhost:11434/api/chat`** - The URL endpoint where the Llama model's API is available. If the Llama model is hosted on a different server or port, make sure to update this URL accordingly.

- **`"model": "llama3.1:8b"`** - The identifier for the specific Llama model version being used. In this case, `"llama3.1:8b"` indicates the Llama 3.1 model with an 8 billion parameter variant. Ensure that this matches the model you have deployed.

- **`"messages": [ { "role": "user", "content": "What are God Particles?" } ]`** - An array of message objects where each object has a `role` and `content`:
  - `role`: The role of the message sender. For user queries, it should be `"user"`. The Llama model will respond based on the user's input.
  - `content`: The text of the message you want the Llama model to process. Replace `"What are God Particles?"` with your query or prompt.

- **`"stream": false`** - Specifies whether to stream the response incrementally or return it all at once:
  - `false`: Returns the complete response after processing.
  - `true`: Streams the response in chunks. This can be useful for processing large responses or for real-time applications.

### Troubleshooting

- **Error Handling**: If you encounter any errors during the API request, check the following:
  - Ensure the Llama server is running and accessible at the specified URL.
  - Verify that the model identifier is correct and matches the deployed model.
  - Check for any issues with network connectivity or server configuration.

- **Common Issues**:
  - **Connection Refused**: This might indicate that the server is not running or the port is incorrect. Verify server status and URL.
  - **Invalid Model Identifier**: Double-check the model identifier to ensure it matches the available model version.


## License

Llama 3.1 is open source and available under the [Open Source License](https://ollama.com/license). You are free to use, modify, and distribute the software in accordance with the terms of the license. For more information, please refer to the [Ollama documentation](https://ollama.com/docs) or the license file included in the distribution.

For more details on Llama 3.1, including source code and contributions, visit the [Llama 3.1 GitHub repository](https://github.com/meta-llama/llama3).

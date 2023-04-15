export async function putToS3(fileObject, presignedUrl) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": fileObject.type,
      },
      body: fileObject,
    };

    console.log(requestOptions, JSON.stringify(fileObject))

    presignedUrl = "https://bucket-for-service-app.s3.amazonaws.com/photos/user_imge.jpg?AWSAccessKeyId=AKIAUHKZXCW5XJRMBJW4&Signature=vHIF2ZoY0o8vvvU7%2BrFnZWsjnzs%3D&Expires=1669408095"
    const response = await fetch(presignedUrl, requestOptions);
    return response;
  }
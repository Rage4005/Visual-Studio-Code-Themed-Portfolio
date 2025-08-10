import type { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

type Data = {
  success: boolean;
  message: string;
  messageId?: string;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Check if it's a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    console.log('Request received:', JSON.stringify(req.body, null, 2));
    
    // Validate required fields
    if (!req.body.name || !req.body.email || !req.body.message) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      console.log('Validation failed: Invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Configure AWS SES
    const ses = new AWS.SES({
      apiVersion: "2010-12-01",
      region: process.env.AWS_REGION || "ap-south-1",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const params = {
      Destination: {
        ToAddresses: ["armankhanssjfyj999@gmail.com"],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
              <div><strong>Name:</strong> ${req.body.name}</div>
              <div><strong>Email:</strong> ${req.body.email}</div>
              <div><strong>Message:</strong></div>
              <div>${req.body.message.replace(/\n/g, '<br>')}</div>
            `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: `New Contact Form Submission from ${req.body.name}`,
        },
      },
      Source: "armankhanssjfyj999@gmail.com",
      ReplyToAddresses: [req.body.email],
    };

    // Log the email parameters (without sensitive data)
    const logParams = { ...params };
    if (logParams.Message?.Body?.Html?.Data) {
      logParams.Message.Body.Html.Data = '[HTML CONTENT]';
    }
    console.log('Sending email with params:', JSON.stringify(logParams, null, 2));
    
    // Send the email
    const result = await ses.sendEmail(params).promise();
    console.log('Email sent successfully:', result.MessageId);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!',
      messageId: result.MessageId
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Log detailed error information
    const errorInfo = {
      name: error.name,
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      region: error.region,
      time: new Date().toISOString(),
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };
    
    console.error('Error details:', errorInfo);
    
    // Provide more specific error messages based on the error code
    let userMessage = 'Failed to send message';
    
    if (error.code === 'MessageRejected' && error.message.includes('Email address is not verified')) {
      userMessage = 'The sender email address is not verified in Amazon SES.';
    } else if (error.code === 'AccessDenied') {
      userMessage = 'AWS credentials are invalid or insufficient.';
    } else if (error.code === 'NetworkError') {
      userMessage = 'Network error occurred. Please check your internet connection.';
    }
    
    return res.status(500).json({ 
      success: false, 
      message: userMessage,
      error: process.env.NODE_ENV === 'development' ? {
        ...errorInfo,
        awsError: {
          code: error.code,
          message: error.message,
          statusCode: error.statusCode,
          region: error.region,
          requestId: error.requestId,
          time: error.time
        }
      } : null
    });
  }
}

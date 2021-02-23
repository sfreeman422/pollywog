import express, { Request, Response, Router } from 'express';
import { WebService } from '../services/web.service';
import { SlashCommandRequest } from '../models/slack.model';
import { PollService } from '../services/poll.service';

export const eventController: Router = express.Router();

const webService = WebService.getInstance();
const pollService = PollService.getInstance();

// Creates a poll.
eventController.post('/poll', async (req: Request, res: Response) => {
  res.status(200).send();
  const request: SlashCommandRequest = req.body;
  const userId = request.user_id;
  const terms: string[] = request.text.split(`" `);
  console.log(terms);
  const header = terms[0];
  const options = terms.slice(1);
  // const anonymous = what?

  let error;
  let poll;

  try {
    poll = pollService.createPoll(header, options, userId, false);
  } catch (e) {
    error = e;
  }

  if (error) {
    webService.sendErrorMessage(request.channel_name, error.message, userId);
  } else {
    webService.sendMessage(request.channel_name, poll);
  }
});

// eventController.post('/interaction', async (req: Request, res: Response) => {
//   res.status(200).send();
//   const request = JSON.parse(req.body.payload);
//   console.log(request);
//   const type = request.type;
//   const value = request.actions[0].value;
//   const channel = request.channel.name;
//   const text = request.actions[0].action_id;
//   const userId = request.user.id;
//   if (type === 'block_actions') {
//     if (value === 'send') {
//       const words = text.split(',');
//       const url = words[0];
//       const searchTerm = words[1];
//       webService.deleteEphem(request.response_url);
//       webService.sendMessage(channel, url, searchTerm, userId, false, false);
//     } else if (value === 'cancel') {
//       webService.deleteEphem(request.response_url);
//     } else if (value === 'shuffle') {
//       const gifUrl: {
//         data?: string;
//         error?: string;
//       } = await pollService.getGif(text);
//       if (gifUrl.error) {
//         webService.sendErrorMessage(request.channel_name, gifUrl.error, request.user_id);
//       } else {
//         webService.sendMessage(channel, gifUrl.data as string, text, userId, true, false);
//         webService.deleteEphem(request.response_url);
//       }
//     }
//   }
// });

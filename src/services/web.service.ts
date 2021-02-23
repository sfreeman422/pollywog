import { ChatPostMessageArguments, WebClient } from '@slack/web-api';
import Axios from 'axios';

export class WebService {
  public static getInstance(): WebService {
    if (!WebService.instance) {
      WebService.instance = new WebService();
    }
    return WebService.instance;
  }
  private static instance: WebService;
  private web: WebClient = new WebClient(process.env.POLL_BOT_TOKEN);

  public deleteEphem(responseUrl: string): void {
    // eslint-disable-next-line @typescript-eslint/camelcase
    Axios.post(responseUrl, { delete_original: true });
  }

  public sendErrorMessage(channel: string, text: string, user: string): void {
    const token: string | undefined = process.env.POLL_BOT_TOKEN;
    this.web.chat.postEphemeral({
      token,
      channel,
      text,
      user,
    });
  }

  /**
   * Handles sending messages to the chat.
   */
  public sendMessage(channel: string, poll: string): void {
    const token: string | undefined = process.env.POLL_BOT_TOKEN;
    const postRequest: ChatPostMessageArguments = {
      token,
      channel,
      text: 'New Poll',
      blocks: JSON.parse(poll),
    };
    this.web.chat.postMessage(postRequest).catch((e) => console.error(e));
  }
}

export class PollService {
  public static getInstance(): PollService {
    if (!PollService.instance) {
      PollService.instance = new PollService();
    }
    return PollService.instance;
  }
  private static instance: PollService;

  // Needs return type for poll block.
  createPoll(header: string, options: string[], user: string, isAnonymous = false): any {
    // Needs type for block.
    const poll: any = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: header,
            emoji: true,
          },
        },
      ],
    };

    options.forEach((option) => {
      // Adds a option, with buttons.
      poll.blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: option,
          emoji: true,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Vote',
            emoji: true,
          },
          value: option,
          // eslint-disable-next-line @typescript-eslint/camelcase
          action_id: `vote-${option}`,
        },
      });
    });

    poll.blocks.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Poll created ${isAnonymous ? 'anonymously.' : `by: ${user}`}`,
          emoji: true,
        },
      ],
    });

    return poll;
  }
}

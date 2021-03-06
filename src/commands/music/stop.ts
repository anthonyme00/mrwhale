import { VoiceChannel, VoiceConnection } from 'discord.js';
import { Command, Message } from 'yamdbf';
import { BotClient } from '../../client/botClient';
import { moderatorOnly } from '../../util/decorators/moderation';

import * as ytdl from 'ytdl-core';

export default class extends Command<BotClient> {
    constructor() {
        super({
            name: 'stop',
            desc: 'Stop the current playing audio stream.',
            usage: '<prefix>stop',
            group: 'music',
            guildOnly: true
        });
    }

    @moderatorOnly
    async action(message: Message, [video]: [string]): Promise<any> {
        const channel: VoiceChannel = message.member.voiceChannel;
        const connection: VoiceConnection = this.client.musicPlayer.voiceManager.getGuildConnection(
            message.guild
        );

        if (channel) {
            if (!this.client.musicPlayer.voiceManager.isOnChannel(channel))
                return message.channel.send('You must be in the same channel first.');

            this.client.musicPlayer.stop(connection);

            return message.channel.send(`:stop_button: Stopping audio stream.`);
        } else return message.channel.send('You need to join a voice channel first.');
    }
}

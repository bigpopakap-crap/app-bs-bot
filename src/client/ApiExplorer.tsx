import * as React from "react";

import bsBotClient from './utils/bs-bot-client';
import {StorageRowId} from "../shared/types/storage";
import {WordMetadata} from "../shared/types/word-metadata";
import {WordClass} from "../shared/types/words";

interface Props {}
interface State {}

const API_NAMESPACE = 'bsBotApi';

export default class ApiExplorer extends React.Component<Props, State> {
    async getWord(id: StorageRowId) {
        return await bsBotClient.get<'/word/:id'>(`/word/${id}`);
    }

    async createWord(word: WordMetadata<WordClass>) {
        /*
            bsBotApi.createWord({
                forms: ['build', 'building', 'built'],
                tags: ['creation'],
                isNSFW: false,
                value: {
                    class: 'verb',
                    base: 'build',
                    progressive: 'building',
                    present: {
                        first: 'build',
                        second: 'build',
                        third: 'builds',
                        participle: 'built',
                    },
                    past: {
                        first: 'built',
                        second: 'built',
                        third: 'built',
                        participle: 'built',
                    }
                }
            });
         */
        return await bsBotClient.request({
            method: 'POST',
            url: '/word',
            data: word
        });
    }

    componentDidMount() {
        // @ts-ignore
        window[API_NAMESPACE] = {
            getWord: this.getWord.bind(this),
            createWord: this.createWord.bind(this),
        };
    }

    render() {
        return (
            <div>
                Explore the API in the console. Use <code>window.{API_NAMESPACE}</code>.
            </div>
        );
    }
}

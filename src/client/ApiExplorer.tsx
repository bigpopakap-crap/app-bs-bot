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

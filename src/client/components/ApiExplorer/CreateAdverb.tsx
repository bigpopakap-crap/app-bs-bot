import * as React from 'react';

import { Adverb, WordClass } from '../../../shared/types/words';
import { WordMetadata } from '../../../shared/types/word-metadata';
import bsBotClient from '../../utils/bs-bot-client';
import { StoredObject } from '../../../shared/types/storage';

interface Props {
  afterCreate: (adverb: StoredObject<WordMetadata<WordClass.adverb>>) => void;
}

interface State {
  base: Adverb['base'];
}

export default class CreateAdverb extends React.Component<Props, State> {
  // @ts-ignore TODO figure this out
  public constructor(props) {
    super(props);
    this.state = {
      base: ''
    };

    this.createAdverb = this.createAdverb.bind(this);
    this.submit = this.submit.bind(this);
    this.onBaseChanged = this.onBaseChanged.bind(this);
  }

  private async createAdverb(word: WordMetadata<WordClass.adverb>) {
    await bsBotClient.request({
      method: 'POST',
      url: '/word',
      data: word
    });
  }

  private submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //
    // this.createTemplate({
    //   tags: [],
    //   isNSFW: false,
    //   value: this.state.unparsedTemplate
    // }).then(
    //     response => {
    //       // Yay! Success!! Clear the input and tell the parent
    //       this.setState({
    //         unparsedTemplate: ''
    //       });
    //
    //       this.props.afterSuccessfulCreate(response.data);
    //     },
    //     err => {
    //       alert(`Error: ${err}`);
    //     }
    // );
  }

  private onBaseChanged(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      base: event.target.value
    });
  }

  public render() {
    return <div>TODO</div>;
  }
}

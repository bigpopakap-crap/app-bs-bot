import * as React from 'react';

import { Adverb, WordClass } from '../../../shared/types/words';
import { WordMetadata } from '../../../shared/types/word-metadata';
import bsBotClient from '../../utils/bs-bot-client';
import { StoredObject } from '../../../shared/types/storage';

interface Props {
  afterCreate: (word: StoredObject<WordMetadata<WordClass>>) => void;
}

interface State {
  base: Adverb['base'];
}

const formStyle = {
  width: '100%'
};

function inputStyle(isLast: boolean = false) {
  return {
    width: '100%',
    marginBottom: isLast ? '0' : '4px'
  };
}

export default class CreateAdverb extends React.Component<Props, State> {
  // @ts-ignore TODO figure this out
  public constructor(props) {
    super(props);
    this.state = {
      base: ''
    };

    this.createWord = this.createWord.bind(this);
    this.submit = this.submit.bind(this);
    this.onBaseChanged = this.onBaseChanged.bind(this);
  }

  private async createWord(word: WordMetadata<WordClass.adverb>) {
    return await bsBotClient.request({
      method: 'POST',
      url: '/word',
      data: word
    });
  }

  private submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const word: Adverb = {
      class: WordClass.adverb,
      base: this.state.base
    };

    this.createWord({
      forms: [this.state.base],
      tags: [],
      isNSFW: false,
      value: word
    }).then(
      response => {
        // Yay! Success!! Clear the input and tell the parent
        this.setState({
          base: ''
        });

        this.props.afterCreate(response.data);
      },
      err => {
        alert(`Error: ${err}`);
      }
    );
  }

  private onBaseChanged(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      base: event.target.value
    });
  }

  public render() {
    return (
      <form style={formStyle} onSubmit={this.submit}>
        <label htmlFor="createAdverb">
          <input
            id="createAdverb"
            style={inputStyle()}
            type="text"
            name="base"
            value={this.state.base}
            onChange={this.onBaseChanged}
          />

          <ul>
            <li>You write {this.state.base || '_____'}</li>
            <li>You are {this.state.base || '_____'} writing this example.</li>
          </ul>
        </label>

        <input style={inputStyle()} type="submit" value="Create" />
      </form>
    );
  }
}

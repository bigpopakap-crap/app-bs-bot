import * as React from 'react';

import { Noun, WordClass } from '../../../shared/types/words';
import { WordMetadata } from '../../../shared/types/word-metadata';
import bsBotClient from '../../utils/bs-bot-client';
import { StoredObject } from '../../../shared/types/storage';

interface Props {
  afterCreate: (word: StoredObject<WordMetadata<WordClass>>) => void;
}

interface State {
  singular: Noun['singular'];
  plural: Noun['plural'];
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

export default class CreateNoun extends React.Component<Props, State> {
  // @ts-ignore TODO figure this out
  public constructor(props) {
    super(props);
    this.state = {
      singular: '',
      plural: ''
    };

    this.createWord = this.createWord.bind(this);
    this.submit = this.submit.bind(this);
    this.onSingularChanged = this.onSingularChanged.bind(this);
    this.onPluralChanged = this.onPluralChanged.bind(this);
  }

  private async createWord(word: WordMetadata<WordClass.noun>) {
    return await bsBotClient.request({
      method: 'POST',
      url: '/word',
      data: word
    });
  }

  private submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const word: Noun = {
      class: WordClass.noun,
      singular: this.state.singular,
      plural: this.state.plural
    };

    this.createWord({
      forms: [this.state.singular, this.state.plural],
      tags: [],
      isNSFW: false,
      value: word
    }).then(
      response => {
        // Yay! Success!! Clear the input and tell the parent
        this.setState({
          singular: '',
          plural: ''
        });

        this.props.afterCreate(response.data);
      },
      err => {
        alert(`Error: ${err}`);
      }
    );
  }

  private onSingularChanged(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      singular: event.target.value
    });
  }

  private onPluralChanged(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      plural: event.target.value
    });
  }

  public render() {
    return (
      <form style={formStyle} onSubmit={this.submit}>
        <div>
          <label htmlFor="createNounSingular">
            There is one{' '}
            <input
              id="createNounSingular"
              type="text"
              name="singular"
              value={this.state.singular}
              onChange={this.onSingularChanged}
            />
          </label>
        </div>

        <div>
          <label htmlFor="createNounPlural">
            There are multiple{' '}
            <input
              id="createNounPlural"
              type="text"
              name="plural"
              value={this.state.plural}
              onChange={this.onPluralChanged}
            />
          </label>
        </div>

        <input style={inputStyle()} type="submit" value="Create" />
      </form>
    );
  }
}

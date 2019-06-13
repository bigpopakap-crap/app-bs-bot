import * as React from 'react';

import { Verb, WordClass } from '../../../shared/types/words';
import { WordMetadata } from '../../../shared/types/word-metadata';
import bsBotClient from '../../utils/bs-bot-client';
import { StoredObject } from '../../../shared/types/storage';

interface Props {
  afterCreate: (word: StoredObject<WordMetadata<WordClass>>) => void;
}

type State = WordMetadata<WordClass.verb>;

const formStyle = {
  width: '100%'
};

function inputStyle(isLast: boolean = false) {
  return {
    width: '100%',
    marginBottom: isLast ? '0' : '4px'
  };
}

function createEmptyVerb() : Verb {
  return {
    class: WordClass.verb,
    base: '',
    progressive: '',
    present: {
      first: '',
      second: '',
      third: '',
      participle: ''
    },
    past: {
      first: '',
      second: '',
      third: '',
      participle: ''
    }
  };
}

export default class CreateVerb extends React.Component<Props, State> {
  // @ts-ignore TODO figure this out
  public constructor(props) {
    super(props);

    this.state = {
      forms: [],
      tags: [],
      isNSFW: false,
      value: createEmptyVerb();
    };

    this.createWord = this.createWord.bind(this);
    this.submit = this.submit.bind(this);
    this.onSingularChanged = this.onSingularChanged.bind(this);
    this.onPluralChanged = this.onPluralChanged.bind(this);
  }

  private async createWord(word: WordMetadata<WordClass.verb>) {
    return await bsBotClient.request({
      method: 'POST',
      url: '/word',
      data: word
    });
  }

  private submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const word: Verb = {
      class: WordClass.verb,
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

import * as React from 'react';

import { TemplateMetadata } from '../../../shared/types/word-template-metadata';
import { StoredObject } from '../../../shared/types/storage';
import bsBotClient from '../../utils/bs-bot-client';
import { UnparsedTemplate } from '../../../shared/types/word-templates';

interface Props {
  afterCreate: (template: StoredObject<TemplateMetadata>) => void;
}

interface State {
  unparsedTemplate: UnparsedTemplate;
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

export default class CreateTemplate extends React.Component<Props, State> {
  // @ts-ignore
  public constructor(props) {
    super(props);
    this.state = {
      unparsedTemplate: ''
    };

    this.submit = this.submit.bind(this);
    this.onUnparsedTemplateChange = this.onUnparsedTemplateChange.bind(this);
  }

  private async createTemplate(template: TemplateMetadata) {
    return await bsBotClient.request({
      method: 'POST',
      url: '/template',
      data: template
    });
  }

  private submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    this.createTemplate({
      tags: [],
      isNSFW: false,
      value: this.state.unparsedTemplate
    }).then(
      response => {
        // Yay! Success!! Clear the input and tell the parent
        this.setState({
          unparsedTemplate: ''
        });

        this.props.afterCreate(response.data);
      },
      err => {
        alert(`Error: ${err}`);
      }
    );
  }

  private onUnparsedTemplateChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ unparsedTemplate: event.target.value });
  }

  public render() {
    return (
      <form style={formStyle} onSubmit={this.submit}>
        <input
          style={inputStyle()}
          type="text"
          name="unparsedTemplate"
          value={this.state.unparsedTemplate}
          onChange={this.onUnparsedTemplateChange}
          placeholder="This template {1:verb:present:third} {2:adjective}"
        />

        <input style={inputStyle()} type="submit" value="Create" />
      </form>
    );
  }
}

import {
  Form,
  ActionPanel,
  Action,
  showToast,
  showInFinder,
  getPreferenceValues,
  getSelectedFinderItems,
  Detail,
} from "@raycast/api";
import { WebClient } from "@slack/web-api";
import { grabFile } from "./utils/grab-file";
import { useState, useEffect } from "react";

type Values = {
  textfield?: string;
  textarea: string;
  // datepicker: Date;
  // checkbox: boolean;
  // dropdown: string;
  // tokeneditor: string[];
};

export default  function Command() {
  const { token } = getPreferenceValues();
  const web = new WebClient(token);
  const [image, setImage] = useState<string>();

  useEffect(() => {
    grabFile()
    .then((file) => {
      setImage(file[0].path)
    })
    .catch((err) => {
      setImage("");
    });

  })

  async function handleSubmit(values: Values) {
    const channelId = "C029NP7J5C7";

    // const result = await web.chat.postMessage({
    //   text: values.textarea,
    //   channel: channelId,

    // })
    // console.log(`sent ${result.ts}`)
    // console.log(values.textfield);
    // console.log(item)
    // showToast({ title: "Submitted form", message: "See logs for submitted values" });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="Ship a project to the Hack Club Slack!" />
      <Form.TextField id="textfield" title="Title (optional)" placeholder="Title" />
      <Form.TextArea
        id="textarea"
        title="Ship message"
        placeholder="Detail your ship! Feel free to add demo links too!"
      />
      <Form.Separator />
      <Form.Dropdown id="dropdown" title="Channel">
        <Form.Dropdown.Item value="C01504DCLVD" title="Scrapbook" />
        <Form.Dropdown.Item value="C0M8PUPU6" title="Ship" />
        <Form.Dropdown.Item value="C029NP7J5C7" title="warren's channel rofl" />
      </Form.Dropdown>
    </Form>
  );
}

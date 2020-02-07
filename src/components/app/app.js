import React, {Component} from 'react';
import {Grid, Row, Col} from '@jetbrains/ring-ui/components/grid/grid';
import Heading, {
  H1,
  H2,
  H3,
  H4
} from '@jetbrains/ring-ui/components/heading/heading';
import Dialog from '@jetbrains/ring-ui/components/dialog/dialog';
import {Header, Content} from '@jetbrains/ring-ui/components/island/island';
import Select from '@jetbrains/ring-ui/components/select/select';
import Button from '@jetbrains/ring-ui/components/button/button';
import ButtonSet from '@jetbrains/ring-ui/components/button-set/button-set';
import Toggle from '@jetbrains/ring-ui/components/toggle/toggle';

import constants from '../../lib/constants';

import EnvList from './env-list';
import EnvInfo from './env-info';
import AppHeader from './app-header';
import DialogBox from './dialog-box';
import DialogPackage from './dialog-package';
import DialogScreenshot from './dialog-screenshot';

export default class AppRoot extends Component {
  state = {
    dialogModeOpen: null,
    screenshotPreviewIndex: null,
    selectedBoxIndex: 0,
    userData: {

      name: "Martin Starr",
      username: "@0x7b1",
      info: "Developer at Pipedrive",
      avatar: "https://i.ibb.co/ykR6ss7/gilfoyle.jpg"

    },
    boxList: [
      {
        name: 'My Phone',
        os: constants.box.osList.ANDROID.id,
        isPrivate: false,
        starsCount: 10,
        packages: [
          'INSTAGRAM',
          'MESSENGER',
          'SHAZAM',
          'SNAPCHAT',
          'TIKTOK'
        ],
        packages: ["INSTAGRAM", "MESSENGER", "SHAZAM", "SNAPCHAT", "TIKTOK"],
        scriptFiles: [
          {
            filename: 'i3config0.sh',
            language: 'bash',
            content: `
              #!/bin/bash

              ./symlink.sh
              ./aptinstall.sh
              ./programs.sh
              ./desktop.sh

              # Get all upgrades
              sudo apt upgrade -y

              # See our bash changes
              source ~/.bashrc

              # Fun hello
              figlet "... and we're back!" | lolcat`
          },
          {
            filename: 'mycredentials.json',
            language: 'json',
            content: `
              {
                "type": "user",
                "id": "7c78428f-7334-4885-a247-135ab0b17c3b",
                "name": "Carsten Ringe",
                "login": "cringe",
                "profile": {
                  "avatar": {
                    "type": "defaultavatar",
                    "url": "https://hub.jetbrains.com/api/rest/avatar/7c78428f-7334-4885-a247-135ab0b17c3b"
                  }
                },
                "key": "7c78428f-7334-4885-a247-135ab0b17c3b",
                "label": "Carsten Ringe",
                "avatar": "https://hub.jetbrains.com/api/rest/avatar/7c78428f-7334-4885-a247-135ab0b17c3b",
                "description": "cringe"
              }`
          },
          {
            filename: 'genscript.py',
            language: 'python',
            content: `
class Foo:
   def get(self, files):
        yield from roundrobin(*files)

# calling code:
foo = Foo() # or however it is initialized

with open(files_list) as fl:
    filenames = [x.strip() for x in fl]
with ExitStack() as stack:
    files = [stack.enter_context(open(fname)) for fname in filenames]
    for line in foo.get(files):
        do_something_with_line(line)x`
          },
          {
            filename: 'codei9rprog.sh',
            language: 'bash',
            content: `
git remote -v
# View existing remotes
# origin  https://github.com/user/repo.git (fetch)
# origin  https://github.com/user/repo.git (push)

git remote set-url origin https://github.com/user/repo2.git
# Change the 'origin' remote's URL

git remote -v
# Verify new remote URL
# origin  https://github.com/user/repo2.git (fetch)
# origin  https://github.com/user/repo2.git (push)`
          },
        ],
        screenshots: [
          'https://www.androidpolice.com/wp-content/uploads/2019/03/Screenshot_20190313-160401.jpg',
          'https://media.idownloadblog.com/wp-content/uploads/2017/08/ScreenshotXI.jpg'
        ],
        history: [
          {
            event: 'Uploaded a screenshot',
            date: '01/04/2020 20:22'
          },
          {
            event: 'Added Visual Studio Code',
            date: '01/05/2020 18:19'
          },
          {
            event: 'Added IntelliJ',
            date: '01/04/2020 16:20'
          },
          {
            event: 'Added Telegram',
            date: '01/04/2020 15:15'
          },
          {
            event: 'Added qBitTorrent',
            date: '01/04/2020 15:12'
          },
          {
            event: 'New installation made on a new machine',
            date: '01/03/2020 12:38'
          },
          {
            event: 'Added Microsoft Office',
            date: '01/02/2020 12:38'
          },
          {
            event: 'Creation of this box!',
            date: '01/02/2020 12:34'
          }
        ],
        favorites: []
      },
      this.createNewBox(constants.box.osList.WINDOWS.id, 'Pipedrive PC'),
      this.createNewBox(constants.box.osList.LINUX.id, 'Home Desktop')
    ]
  };

  onCloseDialog = () => {
    this.setState({dialogModeOpen: null});
  };

  onAddPackage = packageId => {
    const {boxList, selectedBoxIndex} = this.state;

    const updatedPackages = [...boxList[selectedBoxIndex].packages, packageId];
    const newBoxList = Object.assign([], boxList);
    Object.assign(newBoxList[selectedBoxIndex], {
      packages: updatedPackages
    });

    this.setState({
      boxList: newBoxList
    });

    this.onCloseDialog();
  };

  createNewBox(osId, boxName) {
    return {
      name: boxName,
      os: osId,
      starsCount: 1,
      packages: [],
      scriptFiles: [],
      screenshots: [],
      history: [],
      favorites: []
    };
  }

  onCreateBox = (osId, boxName) => {
    const {boxList} = this.state;

    const newBoxList = Object.assign([], boxList);
    newBoxList.push(this.createNewBox(osId, boxName));

    this.setState({
      boxList: newBoxList
    });

    this.onCloseDialog();
  };

  onPreviewScreenshot = screenshotIdx => {
    this.setState({
      dialogModeOpen: constants.dialog.mode.SCREENSHOT,
      screenshotPreviewIndex: screenshotIdx
    });
  };

  render() {
    const {
      dialogModeOpen,
      boxList,
      selectedBoxIndex,
      userData,
      screenshotPreviewIndex
    } = this.state;

    return (
      <div>
        <AppHeader isLogged/>
        <div className="app-content">
          <Grid data-test="distribution">
            <Row around="xs">
              <Col xs={2}>
                <EnvList
                  userCardInfo={userData}
                  envList={boxList}
                  selectedBoxIndex={selectedBoxIndex}
                  onSelectBox={({id}) =>
                    id !== undefined && this.setState({selectedBoxIndex: id})
                  }
                  onCreateNewBox={() =>
                    this.setState({
                      dialogModeOpen: constants.dialog.mode.BOX
                    })
                  }
                />
              </Col>
              <Col xs={10}>
                <EnvInfo
                  envData={boxList[selectedBoxIndex]}
                  selectedOS={boxList[selectedBoxIndex].os}
                  tags={[]}
                  onPreviewScreenshot={this.onPreviewScreenshot}
                  onAddNewPackage={() =>
                    this.setState({
                      dialogModeOpen: constants.dialog.mode.PACKAGE
                    })
                  }
                />
              </Col>
            </Row>
          </Grid>
          <DialogBox
            dialogMode={dialogModeOpen}
            onCloseDialog={this.onCloseDialog}
            onCreateBox={this.onCreateBox}
          />
          <DialogPackage
            selectedOS={boxList[selectedBoxIndex].os}
            dialogMode={dialogModeOpen}
            onAddPackage={this.onAddPackage}
            onCloseDialog={this.onCloseDialog}
            selectedPackages={
              selectedBoxIndex === null
                ? []
                : boxList[selectedBoxIndex].packages
            }
          />
          <DialogScreenshot
            urlImage={
              boxList[selectedBoxIndex].screenshots[screenshotPreviewIndex]
            }
            dialogMode={dialogModeOpen}
            onCloseDialog={this.onCloseDialog}
          />
        </div>
      </div>
    );
  }
}

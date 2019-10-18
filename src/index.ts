// Import System Details
import { systemDetails } from "./helpers/systemDetails"

// Import Qt5
const {
  QMainWindow,
  QWidget,
  QLabel,
  FlexLayout,
  QPushButton,
  QPushButtonEvents,
  QIcon,
  QProgressBar
} = require("@nodegui/nodegui");

import { resolve } from "path";

//const {platform, operatingSystem, ip, osType, arch} = data.staticDetails

// ---------------------------------------------------
// QMainWindow = main window
// ---------------------------------------------------
const win = new QMainWindow();
win.setWindowTitle('Reply');
win.setFixedSize(450, 435) // width, height
//win.setWindowIcon(new QIcon(resolve(__dirname, "./nodegui.png")));

// ---------------------------------------------------
// QWidget = <div> with 'Flexbox' layout - ROOT
// ---------------------------------------------------
const container = new QWidget();
container.setObjectName("container");
const containerLayout = new FlexLayout();
container.setLayout(containerLayout);

// QLabels
const label_title = new QLabel();
label_title.setObjectName("title_label");
label_title.setText("System Utility Monitor");

const label_subtitle = new QLabel();
label_subtitle.setObjectName("title_label");
label_subtitle.setInlineStyle(`
  color: white;
  font-size: 12px;
  padding-top: 5px;
`);
// ---------------------------------------------------
// 1 Container Boxes row
// ---------------------------------------------------
const containerBoxes = new QWidget();
containerBoxes.setObjectName("container__boxes");
const containerLayoutBoxes = new FlexLayout();
containerBoxes.setLayout(containerLayoutBoxes);
// ---------------------------------------------------
// BOX 1
// ---------------------------------------------------
const box1 = new QWidget();
box1.setObjectName("box1");
const box1Layout = new FlexLayout();
box1.setLayout(box1Layout);

const label_box1 = new QLabel();
label_box1.setObjectName("label_box1");
label_box1.setText("System info");
label_box1.setInlineStyle(`
  font-size: 15px;
  padding: 5px;
  font-weight: bold;
`);
const label_os = new QLabel();
label_os.setObjectName("label_os");
label_os.setInlineStyle(`
  font-size: 10px;
  padding: 5px;
`);
const label_os_type = new QLabel();
label_os_type.setObjectName("label_os_type");
label_os_type.setInlineStyle(`
  font-size: 10px;
  padding: 5px;
`);
const label_ip = new QLabel();
label_ip.setObjectName("label_ip");
label_ip.setInlineStyle(`
  font-size: 10px;
  padding: 5px;
`);
box1Layout.addWidget(label_box1);
box1Layout.addWidget(label_os);
box1Layout.addWidget(label_os_type);
box1Layout.addWidget(label_ip);
// ---------------------------------------------------
// BOX 2
// ---------------------------------------------------
const box2 = new QWidget();
box2.setObjectName("box2");
const box2Layout = new FlexLayout();
box2.setLayout(box2Layout);

const label_box2 = new QLabel();
label_box2.setObjectName("label_box2");
label_box2.setText("CPU Usage");
label_box2.setInlineStyle(`
  font-size: 15px;
  font-weight: bold;
`);
const usedLabel = new QLabel();
usedLabel.setText("Used");
usedLabel.setInlineStyle(`
  padding-top: 10px;
`);
const progressBar_cpu = new QProgressBar();
progressBar_cpu.setObjectName("progressBar_cpu");
const freeLabel = new QLabel();
freeLabel.setText("Free");
freeLabel.setInlineStyle(`
  padding-top: 10px;
`);
const progressBar_cpu2 = new QProgressBar();
progressBar_cpu2.setObjectName("progressBar_cpu2");

box2Layout.addWidget(label_box2);
box2Layout.addWidget(usedLabel);
box2Layout.addWidget(progressBar_cpu);
box2Layout.addWidget(freeLabel);
box2Layout.addWidget(progressBar_cpu2);

usedLabel.hide();
freeLabel.hide();
progressBar_cpu2.hide();
progressBar_cpu.hide();

containerLayoutBoxes.addWidget(box1);
containerLayoutBoxes.addWidget(box2);
// ---------------------------------------------------
// 2 Container Boxes row
// ---------------------------------------------------
const container2Boxes = new QWidget();
container2Boxes.setObjectName("container2__boxes");
const container2LayoutBoxes = new FlexLayout();
container2Boxes.setLayout(container2LayoutBoxes);
// ---------------------------------------------------
// BOX 3
// ---------------------------------------------------
const box3 = new QWidget();
box3.setObjectName("box3");
const box3Layout = new FlexLayout();
box3.setLayout(box3Layout);

const label_box3 = new QLabel();
label_box3.setObjectName("label_box3");
label_box3.setText("Memory Usage");
label_box3.setInlineStyle(`
  font-size: 15px;
  font-weight: bold;
`);
const usedLabel_box3 = new QLabel();
usedLabel_box3.setText("Used");
usedLabel_box3.setInlineStyle(`
  padding-top: 10px;
`);
const progressBar_mem = new QProgressBar();
progressBar_mem.setObjectName("progressBar_mem");
const freeLabel_box3 = new QLabel();
freeLabel_box3.setText("Free");
freeLabel_box3.setInlineStyle(`
  padding-top: 10px;
`);
const progressBar_mem2 = new QProgressBar();
progressBar_mem2.setObjectName("progressBar_mem2");

box3Layout.addWidget(label_box3);
box3Layout.addWidget(usedLabel_box3);
box3Layout.addWidget(progressBar_mem);
box3Layout.addWidget(freeLabel_box3);
box3Layout.addWidget(progressBar_mem2);

usedLabel_box3.hide();
freeLabel_box3.hide();
progressBar_mem2.hide();
progressBar_mem.hide();

container2LayoutBoxes.addWidget(box3);
// ---------------------------------------------------
// Button
// ---------------------------------------------------
const button = new QPushButton();
button.setText("Update");
button.setInlineStyle(`
  align-self: flex-end;
`);
// ---------------------------------------------------
// ADDING LAYERS
// ---------------------------------------------------
containerLayout.addWidget(label_title);
containerLayout.addWidget(label_subtitle);
containerLayout.addWidget(containerBoxes);
containerLayout.addWidget(container2Boxes);
containerLayout.addWidget(button);
// ---------------------------------------------------
// Event handling
// ---------------------------------------------------
button.addEventListener(QPushButtonEvents.clicked, () => {
    getSystemData().then((data) => {
		console.log(data);
		label_subtitle.setText(data.staticDetails.platform);
		label_os.setText(`OS: ${data.staticDetails.operatingSystem}`);
		label_os_type.setText(`OS Type: ${data.staticDetails.osType} ${data.staticDetails.arch}`);
		label_ip.setText(`IP: ${data.staticDetails.ip}`);
		progressBar_cpu.setValue(data.cpuDetails.cpuUsed.usage);
		progressBar_cpu2.setValue(data.cpuDetails.cpuFree.usage);
		progressBar_cpu.show();
		progressBar_cpu2.show();
		usedLabel.show();
		freeLabel.show();
		
		progressBar_mem.setValue(data.memoryDetails.memUsed.usage);
		progressBar_mem2.setValue(data.memoryDetails.memFree.usage);
		progressBar_mem.show();
		progressBar_mem2.show();
		usedLabel_box3.show();
		freeLabel_box3.show();
	});
});

const getSystemData = async () => {
	console.log('getSystemData');
	try {
		const sysData : any = await systemDetails();
		console.log('end getSystemData');
		return sysData;
	} catch(err) {
		console.log(err);
	}
  }

win.setCentralWidget(container);

// ---------------------------------------------------
// Global Style
// ---------------------------------------------------
const rootStyleSheet = `
  #container {
	padding: 10px;
	background-color: #053238;
  }
  #title_label {
    font-size: 22px;
    color: #00b140;
  }
  #container__boxes {
	flex-direction: row;
	padding-top: 15px;
  }
  #container2__boxes {
	flex-direction: row;
	padding-top: 15px;
	padding-bottom: 10px;
  }
  #box1 {
	  height: 150px;
	  background-color: #d0e420;
	  border-radius: 5px;
	  color: black;
	  flex: 1;
	  margin-right: 5px;
  }
  #box2 {
	  height: 150px;
	  background-color: #ffbf00;
	  border-radius: 5px;
	  color: black;
	  flex: 1;
	  padding: 10px;
  }
  #box3 {
	  height: 150px;
	  background-color: #2e7cfa;
	  border-radius: 5px;
	  color: black;
	  flex: 1;
	  padding: 10px;
  }
  
`;

// ---------------------------------------------------
// SHOW WINDOW
// ---------------------------------------------------
win.setStyleSheet(rootStyleSheet);
win.show();
(global as any).win = win;
# System-Utility-Monitor
System Utility Monitor with NodeGUI

## Install
- NodeJs 12+
- CMake
- Install Visual C++ Build Toolset or Visual Studio.	
  - https://visualstudio.microsoft.com/it/thank-you-downloading-visual-studio/?sku=BuildTools&rel=15
```
git clone https://github.com/nodegui/nodegui-starter
cd nodegui-starter
npm install
npm run start
with npm run start --inspect
```

### live reloading
```
npm install --save-dev nodemon
```
in package.json:
```
"start:watch": "nodemon -e js,ts,tsx --ignore dist/ --ignore node_modules/ --exec npm start"
```
run: ```npm run start:watch```

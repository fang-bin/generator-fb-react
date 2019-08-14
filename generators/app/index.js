'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');
module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    this.log(
      yosay(`Welcome to the ${chalk.red('yeoman react')}`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'namespace',
        message: 'Please input your project namespace, such as @babel, if not, ignore it',
        default: '',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Please input project name(this options is required, and if you want to initialize ths current project, the folder name must be ths same as the name):',
        default: path.basename(this.destinationPath()),
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please input project description:',
        default: 'a simple react project',
      },
      {
        type: 'input',
        name: 'main',
        message: 'Main file(index.js)',
        default: 'index.js',
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Package keywords (comma to split)',
        default: 'react',
      },
      {
        type: 'input',
        name: 'author',
        message: '"Author\'s Name"',
        default: 'fangbin',
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Project homepage url (｡･ω･)ﾉﾞ',
        default: '',
      },
      {
        type: 'input',
        name: 'version',
        message: 'Please input project version ( • ̀ω•́ )✧',
        default: '1.0.0',
      }
    ];
    return this.prompt(prompts).then(props => {
      this.props = props;
      if (this.props.namespace){
        this.props.fullName = this.props.namespace + '/' + this.props.name;
      }else {
        this.props.fullName = this.props.name;
      }
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name){
      this.log(`\nYour generator must be inside a folder named ${this.props.name}\n I will automatically create this folder. \n`);
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  _getCameClassName(name) {
    if (name.indexOf('-')){
      let temName = name.toLowerCase().split('-');
      temName = temName.map(e => {
        return e.substring(0, 1).toUpperCase() + e.substring(1);
      });
      return temName.join('');
    }
    return name;
  }

  writing() {
    this.log('\nWriting...\n');
    this._writingPackageJSON();
    this._writingREADME();
    this._writingBabelConfig();
    this._writingGitignore();
    this._writingPostcssConfig();
    this._writingSrc();
    this._writingConfig();
    this._writingTsConfig();
  }

  _writingPackageJSON() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        fullName: this.props.fullName,
        description: this.props.description,
        main: this.props.main,
        version: this.props.version,
        keywords: this.props.keywords.split(','),
        author: this.props.author,
        repository: this.props.repository,
      }
    );
  }

  _writingREADME() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        fullName: this.props.fullName,
        description: this.props.description,
        author: this.props.author,
        version: this.props.version,
        time: new Date().toLocaleDateString(),
        repository: this.props.repository,
        keywords: this.props.keywords.split(','),
      }
    );
  }

  _writingBabelConfig() {
    this.fs.copyTpl(
      this.templatePath('babel.config.js'),
      this.destinationPath('babel.config.js')
    );
  }

  _writingGitignore() {
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore'),
    );
  }

  _writingPostcssConfig() {
    this.fs.copyTpl(
      this.templatePath('postcss.config.js'),
      this.destinationPath('postcss.config.js')
    );
  }

  _writingSrc() {
    this.fs.copy(
      this.templatePath('src/**/*'),
      this.destinationPath('src')
    );
    this.fs.copyTpl(
      this.templatePath('src/index.html'),
      this.destinationPath('src/index.html'),
      {
        name: this.props.name,
      },
    );
    mkdirp('src/components');
    mkdirp('src/common');
    mkdirp('src/pages');
  }

  _writingConfig() {
    this.fs.copy(
      this.templatePath('config/*'),
      this.destinationPath('config'),
    );
  }

  _writingTsConfig() {
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json'),
    );
  }

  install() {
    this.log('\n Install deps...\n');
    this.installDependencies({
      bower: false,
    });
  }
}
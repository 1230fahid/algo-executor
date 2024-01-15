import { Component, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrieNode } from '../../models/trieNode';

@Component({
  selector: 'app-trie',
  templateUrl: './trie.component.html',
  styleUrl: './trie.component.css'
})
export class TrieComponent implements AfterViewInit {
  addedWordGroup: FormGroup;
  searchWordGroup: FormGroup;
  deleteWordGroup: FormGroup;
  locked: boolean;
  formProperties;
  trieNodeArray: TrieNode[];
  trieNodeSet: Set<TrieNode>;
  rect;
  root: TrieNode;
  middle: number;
  afterView: boolean;
  @ViewChild('svg') svgElement: ElementRef;

  constructor() {
    this.addedWordGroup = new FormGroup({
      word : new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
    this.searchWordGroup = new FormGroup({
      word : new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
    this.deleteWordGroup = new FormGroup({
      word : new FormControl(null, [Validators.required, Validators.minLength(3)])
    });

    this.formProperties = {
      style: {
        width: '100%'
      },
      class: 'formTag',
      disabled: false,
      formControlName: 'word',
      inputType: 'text'
    };
    this.root = new TrieNode();
    this.trieNodeArray = [];
    this.trieNodeArray.push(this.root);
    this.trieNodeSet = new Set<TrieNode>();
    this.trieNodeSet.add(this.root);
    this.afterView = false;
  }

  ngAfterViewInit() {
    this.rect = this.svgElement.nativeElement.getBoundingClientRect();
    //console.log("(AfterViewInit) this.rect is:");
    //console.dir(this.rect);
    this.middle = this.rect["width"]/2;
    console.log("this.rect in ngAfterViewInit is:");
    console.dir(this.rect);
    console.log("this.middle in ngAfterViewInit is " + this.middle);
    this.root.setPosition(this.rect["width"]/2, 40);
    this.afterView = true;
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.rect = this.svgElement.nativeElement.getBoundingClientRect();
    //console.log("(HostListener) this.rect is:");
    //console.dir(this.rect);
    this.middle = this.rect["width"]/2;
    console.log("this.middle is " + this.middle);
    if(this.root.value !== undefined) {
      this.root.updateDistance();
      this.root.setPosition(this.rect["width"]/2, 40);
    }
  }

  onAdd() {
    let addedWord = this.addedWordGroup.get('word').value;
    let node = this.root;
    
    for(let i = 0; i < addedWord.length; i++) {
      console.log("node.value is " + node.value);
      if(!node.nextLetters.has(addedWord.charAt(i))) {
        let nxtNode = new TrieNode();
        nxtNode.value = addedWord.charAt(i);
        nxtNode.parent = node;
        node.nextLetters.set(addedWord.charAt(i), nxtNode);
      }  
      node = node.nextLetters.get(addedWord.charAt(i));
      if(!this.trieNodeSet.has(node)) {
        this.trieNodeSet.add(node);
        this.trieNodeArray.push(node);
      }
    }
    this.root.updateDistance();
    this.root.setPosition(this.rect["width"]/2, 40);
    console.log("this.root is:");
    console.dir(this.root);
  }

  onSearch() {
    let searchedWord = this.searchWordGroup.get('word').value;
    console.log(searchedWord);
  }

  onDelete() {
    let deletedWord = this.deleteWordGroup.get('word').value;
    console.log(deletedWord);
  }

  getFormProperties(bootStrapButtonClass) {
    return {...this.formProperties, bootStrapButtonClass};
  }

  getParentXCoordinate(parentNode: TrieNode, childNode: TrieNode) {
    if(parentNode.distances.get(childNode.value) < 0) {
      return -30*Math.cos(Math.PI/4);
    }
    else if (parentNode.distances.get(childNode.value) > 0) {
      return 30*Math.cos(Math.PI/4);
    }
    else {
      return 0;
    }
  }

  getParentYCoordinate(parentNode: TrieNode, childNode: TrieNode) {
    if(parentNode.distances.get(childNode.value) < 0) {
      return 30*Math.sin(Math.PI/4);
    }
    else if (parentNode.distances.get(childNode.value) > 0) {
      return 30*Math.sin(Math.PI/4);
    }
    else {
      return 30;
    }
  }

  getChildXCoordinate(parentNode: TrieNode, childNode: TrieNode) {
    if(parentNode.distances.get(childNode.value) < 0) {
      return 30*Math.cos(Math.PI/4);
    }
    else if (parentNode.distances.get(childNode.value) > 0) {
      return -30*Math.cos(Math.PI/4);
    }
    else {
      return 0;
    }
  }

  getChildYCoordinate(parentNode: TrieNode, childNode: TrieNode) {
    if(parentNode.distances.get(childNode.value) < 0) {
      return -30*Math.sin(Math.PI/4);
    }
    else if (parentNode.distances.get(childNode.value) > 0) {
      return -30*Math.sin(Math.PI/4);
    }
    else {
      return -30;
    }
  }

}

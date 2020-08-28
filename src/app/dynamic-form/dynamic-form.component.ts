import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragStart, CdkDragMove} from '@angular/cdk/drag-drop';
import { MatList } from '@angular/material';
import { ModalManager } from 'ngb-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @ViewChild(MatList, {static: true}) child: ElementRef;
  @ViewChild('dynamicForm', {static: true}) txtModal;
  @ViewChild('selectBox', {static: true}) selectModal;
  @ViewChild('checkBox', {static: true}) checkModal;

  modalIndex = 0;
  types = [
    {
      name: 'Text Box',
      label: '',
      type: 'text',
      placeholder: '',
      key: ''
    },
    {
      name: 'Check Box',
      option: [{option: ''}],
      label: '',
      type: 'checkbox',
    },
    {
      name: 'Select',
      option: [{option: ''}],
      label: '',
      placeholder: '',
      type: 'select',
    }
  ];

  fields: any = [];
  field: any = [];
  currentIndex: any;
  currentField: any;

  constructor(
    private modal: NgbModal
  ) { }

  ngOnInit() {
  }
  dragStart(event: CdkDragStart) {
    this.currentIndex = this.types.indexOf(event.source.data);
    // this._currentField = this.child.nativeElement.children[this._currentIndex];
  }
  moved(event: CdkDragMove) {
    // if (this.child.nativeElement.children[this._currentIndex] !== this._currentField) {
    //   this.child.nativeElement.replaceChild(this._currentField, this.child.nativeElement.children[this._currentIndex]);
    // }
  }
  itemDropped(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    } else {
      this.addField(event.item.data, event.currentIndex);
      this.modalIndex = event.currentIndex;
      this.checkMethod(event.item.data, event.currentIndex);
    }
  }
  addField(fieldType: string, index: number) {
    this.fields.splice(index, 0, fieldType);

    // this.fields[index].key = 'textfield' + this.count;
    //   label: '',
    //   type: 'text',
    //   placeholder: '',
    //   key: 'textfield' + index
    // };
  }
  checkMethod(eve, ind?) {
    if (eve.name === 'Text Box') {
      this.modal.open(this.txtModal, {size: 'lg'});
    } else if (eve.name === 'Select') {
      this.modal.open(this.selectModal, {size: 'lg'});
    } else if (eve.name === 'Check Box') {
      this.modal.open(this.checkModal, {size: 'lg'});
    }
  }
  openModal(index?) {
    this.modalIndex = index;
    this.checkMethod(this.fields[index]);
  }
  removeField(ind?) {
    this.fields.splice(ind, 1);
    // this.field.splice(ind, 1);
  }
  close() {
    this.modal.dismissAll();
  }
  addOptionMethod() {
    this.fields[this.modalIndex].option.push({option: ''});
  }
  removeOptionMethod(ind?) {
    if (ind !== 0) {
      this.fields[this.modalIndex].option.splice(ind, 1);
    }
  }
  submitMethod() {
    this.modal.dismissAll();
    if (this.field.length !== 0) {
      this.field = [];
      this.field = this.fields;
    } else { this.field = this.fields; }
  }
  test() {
    console.log(this.fields);
    console.log(this.field);
  }
  change(eve) {
    // this.field[this.modalIndex]['label'] = eve.target.value;
  }

}

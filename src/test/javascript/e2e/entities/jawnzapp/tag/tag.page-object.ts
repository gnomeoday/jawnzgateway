import { element, by, ElementFinder } from 'protractor';

export class TagComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jwn-tag div table .btn-danger'));
  title = element.all(by.css('jwn-tag div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class TagUpdatePage {
  pageTitle = element(by.id('jwn-tag-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  textInput = element(by.id('field_text'));

  commentSelect = element(by.id('field_comment'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setTextInput(text: string): Promise<void> {
    await this.textInput.sendKeys(text);
  }

  async getTextInput(): Promise<string> {
    return await this.textInput.getAttribute('value');
  }

  async commentSelectLastOption(): Promise<void> {
    await this.commentSelect.all(by.tagName('option')).last().click();
  }

  async commentSelectOption(option: string): Promise<void> {
    await this.commentSelect.sendKeys(option);
  }

  getCommentSelect(): ElementFinder {
    return this.commentSelect;
  }

  async getCommentSelectedOption(): Promise<string> {
    return await this.commentSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class TagDeleteDialog {
  private dialogTitle = element(by.id('jwn-delete-tag-heading'));
  private confirmButton = element(by.id('jwn-confirm-delete-tag'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

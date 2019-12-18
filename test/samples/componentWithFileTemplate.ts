/**
 * This is a bank account component
 */
@Component({
  selector: 'bank-account',
  template: `
      Bank Name: {{bankName}}
      Account Id: {{id}}
    `
})
export class BankAccount {
  @Input() bankName: string;
  @Input('account-id') id: string;

  normalizedBankName: string;
}

/**
 * This is a bank account holder component
 */
@Component({
  selector: 'bank-account-holder',
  templateUrl: 'file-template.html'
})
export class BankAccountHolder { }
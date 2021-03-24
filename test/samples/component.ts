/**
 * This is a bank account component
 * This is line 2 description
 */
@Component({
  selector: 'bank-account',
  template: `
      Bank Name: {{bankName}}
      Account Id: {{id}}
    `
})
export class BankAccount extends Object implements OnInit, OnDestroy, OnChanges {
  @Input() bankName: string;
  @Input('account-id') id: string;

  normalizedBankName: string;
}

/**
 * This is a bank account holder component
 */
@Component({
  selector: 'bank-account-holder',
  template: `
      <bank-account bankName="RBC" account-id="4747">
        <ng-content></ng-content>
      </bank-account>
    `
})
export class BankAccountHolder implements OnInit { }
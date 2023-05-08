import { RedmineApi } from './lib/redmine-api';
import { forkJoin, of } from 'rxjs';
import { Axios } from 'axios-observable';

const redmineBaseUrl = 'https://redmine.squeezer-software.com';
const redmineAccessKey = 'a6120097f9989fabe5947dccd1f5879a8e8a4e3a'; // TODO : TOP SECRET. should handle properly
Axios.defaults.adapter = 'http';

describe('logging time', () => {
  describe('LCL', function () {
    it('should log time for 2023', function (done) {
      let redmineApi = new RedmineApi(redmineBaseUrl, redmineAccessKey);
      forkJoin(
        [
          '03/04/2023',
          '04/04/2023',
          '05/04/2023',
          '06/04/2023',
          '07/04/2023',
          '10/04/2023',
          '11/04/2023',
          '12/04/2023',
          '13/04/2023',
          '14/04/2023',
          '17/04/2023',
          '18/04/2023',
          '19/04/2023',
          '20/04/2023',
          '21/04/2023',
          '24/04/2023',
          '25/04/2023',
          '26/04/2023',
          '27/04/2023',
          '28/04/2023',
        ]
          .map(date => {
            const matches = date.match(/\d+/g);

            return matches && `${matches[2]}/${matches[1]}/${matches[0]}`;
          })
          .map(date =>
            // of(date)
            date ? redmineApi.markDayAsWorked(date, 26151, 'LCL') : of(null),
          ),
      ).subscribe(value => {  
        console.log(value);
        done();
      });
    }, 300_000 /* timeout in 300s = 5min  */);

  });
  describe('Vacation', function () {
    it('should log time for 2021', function (done) {
      let redmineApi = new RedmineApi(redmineBaseUrl, redmineAccessKey);
      forkJoin(
        [
          '04/01/2021',
          '05/01/2021',
          '06/01/2021',
          '07/01/2021',
          '08/01/2021',
          '11/01/2021',
          '12/01/2021',
          '13/01/2021',
          '14/01/2021',
          '15/01/2021',
          '21/01/2021',
          '26/01/2021',
          '15/03/2021',
          '17/03/2021',
          '14/05/2021',
          '20/09/2021',
          '21/09/2021',
          '22/09/2021',
          '23/09/2021',
          '24/09/2021',
          '27/09/2021',
          '28/09/2021',
          '29/09/2021',
          '30/09/2021',
          '01/10/2021',
          '20/12/2021',
          '21/12/2021',
          '22/12/2021',
          '23/12/2021',
          '24/12/2021',

        ]
          .map(date => {
            const matches = date.match(/\d+/g);

            return matches && `${matches[2]}/${matches[1]}/${matches[0]}`;
          })
          .map(date =>
            // of(date)
            date ? redmineApi.markDayAsWorked(date, 26469, 'Congé', 'MAINTENANCE') : of(null),
          ),
      ).subscribe(value => {
        console.log(value);
        done();
      });
    }, 300_000 /* timeout in 300s = 5min  */);

  })
  describe('Holiday', function () {
    it('should log time for 2021', function (done) {
      let redmineApi = new RedmineApi(redmineBaseUrl, redmineAccessKey);
      forkJoin(
        [
          '01/01/2021',
          '05/04/2021',
          '13/05/2021',
          '24/05/2021',
          '14/07/2021',
          '01/11/2021',
          '11/11/2021',
        ]
          .map(date => {
            const matches = date.match(/\d+/g);

            return matches && `${matches[2]}/${matches[1]}/${matches[0]}`;
          })
          .map(date =>
            // of(date)
            date ? redmineApi.markDayAsWorked(date, 26469, 'Jour férié', 'SUPPORT') : of(null),
          ),
      ).subscribe(value => {
        console.log(value);
        done();
      });
    }, 300_000 /* timeout in 300s = 5min  */);

  });
});

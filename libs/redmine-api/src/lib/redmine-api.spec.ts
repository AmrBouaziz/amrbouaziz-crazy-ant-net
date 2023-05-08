import { RedmineApi } from './redmine-api';
import { lastValueFrom, of } from 'rxjs';
import { XMLBuilder } from 'fast-xml-parser';
import { Axios } from 'axios-observable';

const redmineBaseUrl = 'https://redmine.squeezer-software.com';
const redmineAccessKey = 'a6120097f9989fabe5947dccd1f5879a8e8a4e3a'; // TODO : TOP SECRET. should handle properly

describe(RedmineApi.name, () => {
  let redmineApi: RedmineApi;
  beforeEach(() => {
    // Note: this is required while in jest test because jest-dom provides the xhr API found in the browser.
    //  usually this is not a bad thing, in fact, this leads me to redo the tests for this lib (using snapshots maybe)
    //  however, I'm calling the real server, and xhr neads to make a preflight request to check if the request should be allowed
    //  see more at https://github.com/axios/axios/issues/1180
    Axios.defaults.adapter = 'http';

    redmineApi = new RedmineApi(
      redmineBaseUrl,
      redmineAccessKey,
    );
  });

  describe(RedmineApi.prototype.buildXmlBody.name, () => {
    it('should build xml body', () => {
      expect(redmineApi.buildXmlBody('2021/12/31', issue, comment)).toMatchSnapshot();
    });
  });

  describe(RedmineApi.prototype.markDayAsWorked.name, () => {
    it('should call the correct endpoint', async () => {
      // Given
      jest.spyOn(Axios, 'post').mockReturnValue(
        of({
          data: `<?xml version="1.0" encoding="UTF-8"?>
<time_entry>
    <id>51419</id>
    <project id="205" name="[Ouimind-FR] Mission Clevermind - LCL"/>
    <issue id="26151"/>
    <user id="43" name="Amr BOUAZIZ"/>
    <activity id="9" name="Development"/>
    <hours>1.0</hours>
    <comments>LCL</comments>
    <spent_on>2021-12-31</spent_on>
    <created_on>2023-03-11T14:21:13Z</created_on>
    <updated_on>2023-03-11T14:21:13Z</updated_on>
</time_entry>`,
        }) as any, // TODO : find a better type
      );

      const date = '2021/12/31';
      const requestBody = `<time_entry>
  <issue_id>26151</issue_id>
  <activity_id>9</activity_id>
  <hours>8</hours>
  <comments>LCL</comments>
  <spent_on>2021-12-31</spent_on>
</time_entry>
`;
      // WHEN

      const response = await lastValueFrom(redmineApi.markDayAsWorked(date));
      expect(Axios.post).toBeCalledTimes(1);
      expect(Axios.post).toBeCalledWith(
        redmineBaseUrl + '/time_entries.json',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/xml',
            'X-Redmine-API-Key': redmineAccessKey,
          },
        },
      );
      expect(response).toBeDefined();
      expect(response).not.toBeNull();
      expect(Array.isArray(response)).toBeFalsy();
    });
    it('should call the correct endpoint twice', async () => {
      // Given
      jest.spyOn(Axios, 'post').mockReturnValue(
        of({
          data: `<?xml version="1.0" encoding="UTF-8"?>
<time_entry>
    <id>51419</id>
    <project id="205" name="[Ouimind-FR] Mission Clevermind - LCL"/>
    <issue id="26151"/>
    <user id="43" name="Amr BOUAZIZ"/>
    <activity id="9" name="Development"/>
    <hours>1.0</hours>
    <comments>LCL</comments>
    <spent_on>2021-12-31</spent_on>
    <created_on>2023-03-11T14:21:13Z</created_on>
    <updated_on>2023-03-11T14:21:13Z</updated_on>
</time_entry>`,
        }) as any, // TODO : find a better type
      );

      const date = '2021/12/31';
      const requestBody = `<time_entry>
  <issue_id>26151</issue_id>
  <activity_id>9</activity_id>
  <hours>8</hours>
  <comments>LCL</comments>
  <spent_on>2021-12-31</spent_on>
</time_entry>
`;
      // WHEN

      const response = await lastValueFrom(redmineApi.markDayAsWorked([date, date]));
      expect(Axios.post).toBeCalledTimes(2);
      expect(Axios.post).toBeCalledWith(
        redmineBaseUrl + '/time_entries.json',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/xml',
            'X-Redmine-API-Key': redmineAccessKey,
          },
        },
      );
      expect(response).toBeDefined();
      expect(response).not.toBeNull();
      expect(Array.isArray(response)).toBeTruthy();
      expect(response.length).toEqual(2)
    });
  });
});

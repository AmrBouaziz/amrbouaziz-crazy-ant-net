import { Axios } from 'axios-observable';
import { forkJoin, map, Observable, tap } from 'rxjs';
import { XMLBuilder } from 'fast-xml-parser';
import { AxiosResponse } from 'axios';

export  const  ACTIVITY_MAP = {
  DEV: 9,
  MAINTENANCE: 10,
  SUPPORT: 15,
}

export type Activity = keyof typeof ACTIVITY_MAP;
export class RedmineApi {



  private readonly _xmlBuilder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
  });
  constructor(
    private readonly _redmineBaseUrl: string,
    private readonly _redmineAccessKey: string,
  ) {}

  buildXmlBody(date: string, issue: number, comment: string = 'No Comment', activity: Activity= 'DEV') {
    return this._xmlBuilder.build({
      time_entry: {
        issue_id: issue,
        activity_id: ACTIVITY_MAP[activity], // DEV
        hours: 8.0,
        comments: comment,
        spent_on: date.replace(/\//g, '-'),
      },
    });
  }

  markDayAsWorked<
    T extends string | string[],
    ReturnType = T extends string[]
      ? Array<AxiosResponse<string>>
      : T extends string
      ? AxiosResponse<string>
      : never,
  >(date: T, issue: number, comment?: string, activity?: Activity): Observable<ReturnType> {
    let dates: string[];
    let singleValue = false;
    if (typeof date === 'string') {
      singleValue = true;
      dates = [date];
    } else if (Array.isArray(date)) {
      dates = date;
    } else {
      throw new Error(
        `expected date to be string | string[] but got ${typeof date}`,
      );
    }

    return forkJoin(
      dates.map(date =>
        Axios.post(
          this._redmineBaseUrl + '/time_entries.json',
          this.buildXmlBody(date, issue, comment, activity),
          {
            headers: {
              'Content-Type': 'application/xml',
              'X-Redmine-API-Key': this._redmineAccessKey
            }
          }
        )
      )
    ).pipe(
      // @ts-ignore TODO: No any please
      map((value: any) => {
        if (singleValue) {
          return value[0] as ReturnType;
        }
        return value as ReturnType;
      }),
      tap(console.log)
    );
  }
}

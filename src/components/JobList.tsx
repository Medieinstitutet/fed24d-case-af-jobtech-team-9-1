import { useContext, useEffect } from 'react';
import { getJobs } from '../services/jobServices';
import { Link } from 'react-router';
import { JobContext } from '../context/JobContext';
import { JobActionType } from '../reducers/JobReducer';
import {
  DigiButton,
  DigiLayoutBlock,
  DigiLayoutColumns,
  DigiLink,
  DigiMediaImage,
  DigiTypographyTime,
} from '@digi/arbetsformedlingen-react';
import {
  ButtonSize,
  ButtonVariation,
  LayoutBlockVariation,
  LayoutColumnsElement,
  LayoutColumnsVariation,
  TypographyTimeVariation,
} from '@digi/arbetsformedlingen';

const LIMIT = 10;

export const JobList = () => {
  const { offset, searchWord, jobs, dispatch } = useContext(JobContext);

  useEffect(() => {
    const getData = async () => {
      const data = await getJobs(searchWord, offset);
      dispatch({ type: JobActionType.SET_JOBS, payload: data });
    };

    getData();
  }, [dispatch, offset, searchWord]); // <- hämta nytt varje gång offset ändras

  const fetchPrevPage = () => {
    dispatch({
      type: JobActionType.SET_OFFSET,
      payload: Math.max(offset - LIMIT, 0),
    });
  };

  const fetchNextPage = () => {
    dispatch({ type: JobActionType.SET_OFFSET, payload: offset + LIMIT });
  };

  return (
    <>
      <h2>Jobb</h2>
      <div>
        {jobs?.hits.map((job) => (
          <div key={job.id}>
            <DigiLayoutBlock
              afVariation={LayoutBlockVariation.PRIMARY}
              afMarginBottom
              afVerticalPadding
            >
              <DigiLayoutColumns
                afElement={LayoutColumnsElement.DIV}
                afVariation={LayoutColumnsVariation.TWO}
              >
                {/* col1 */}
                <div>
                  <DigiLink afHref={'#'}>
                    <Link to={`/job/${job.id}`}>
                      <h2>{job.headline}</h2>
                    </Link>
                  </DigiLink>
                  <h3>{job.employer.name}</h3>
                  <p>{job.workplace_address.city}</p>
                  <p>
                    Publicerad&nbsp;
                    <DigiTypographyTime
                      afVariation={TypographyTimeVariation.PRETTY}
                      afDateTime={job.publication_date}
                    />
                  </p>
                </div>
                {/* col2 */}
                {job?.logo_url && (
                  <DigiMediaImage
                    afUnlazy
                    afHeight="100"
                    afWidth="100"
                    afSrc={job.logo_url}
                    afAlt={`${job.employer.name} logo`}
                  ></DigiMediaImage>
                )}
              </DigiLayoutColumns>
            </DigiLayoutBlock>
          </div>
        ))}
      </div>
      <div>
        <DigiButton
          afSize={ButtonSize.SMALL}
          afVariation={ButtonVariation.SECONDARY}
          afFullWidth={false}
          //   disabled={offset === 0}
          onClick={() => fetchPrevPage()}
        >
          Föregående
        </DigiButton>
        <span>Page {offset / LIMIT + 1}</span>
        <DigiButton
          afSize={ButtonSize.SMALL}
          afVariation={ButtonVariation.SECONDARY}
          afFullWidth={false}
          onClick={() => fetchNextPage()}
          //  disabled={jobs?.hits.length < LIMIT}
        >
          Nästa
        </DigiButton>
      </div>
    </>
  );
};

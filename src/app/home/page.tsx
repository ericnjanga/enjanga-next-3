'use client';

import { useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { Grid, Column } from '@carbon/react';
import { Banner } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import SectionOfTabs from '../../components/SectionOfTabs/index';
import ContentAbout from './ContentAbout';
import ContentBestWork from './ContentBestWork';
import './../home/_home.scss';
import { ContentfulFetcher } from '@/libs/ContentfulFetcher';
import { sortByOrderProp } from '@utils/helpers';

export default function LandingPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const section = searchParams.get('section');

  const handleScroll = () => {
    // Logic to detect which section is in view
    // console.log('Which section is in view???');
  };

  /**
   * Listen to when the page scrolls and do something
   */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Only if we are on the home page, it will only scroll to the designated section
   */
  useEffect(() => {
    // Only scroll if we're on the home page already
    if (pathname === '/' && section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });

        // Set focus on keyboard/screen reader users
        element.setAttribute('tabindex', '-1'); // Make focusable
        element.focus({ preventScroll: true }); // Focus without re-scrolling

        // Update URL without page reload
        window.history.replaceState(null, '', `/?section=${section}`);
      }
    }
  }, [section, pathname]);

  return (
    <div className="homePage">
      <ContentfulFetcher dataFor="Landing Page Banner">
        {({ title, richDescription }) => (
          <Banner
            title={title}
            richDescription={richDescription}
            showRichDescription={true}
            isHuge={true}
          />
        )}
      </ContentfulFetcher>

      <ContentfulFetcher dataFor="Scope of expertise list">
        {({ items }) => {
          const orderedItems = sortByOrderProp(items);
          return (
            <section
              className="pageSection smt-box section-expertises"
              id="scope-of-expertise"
              aria-labelledby="scope-of-expertise-heading"
              tabIndex={-1} // Make focusable by default
            >
              <SectionOfTabs
                title="Scope of Expertise"
                className="expertise-section-tabs"
                listOfItems={orderedItems}
              />
            </section>
          );
        }}
      </ContentfulFetcher>

      <section
        className="pageSection aboutSection smt-box"
        id="about-me"
        aria-labelledby="about-me-heading"
        tabIndex={-1} // Make focusable by default
      >
        <Grid fullWidth className="sectionTitle">
          <Column lg={16} md={8} sm={4}>
            <h2 id="about-me-heading">About me</h2>
          </Column>
        </Grid>
        <Grid fullWidth>
          <Column lg={16} md={8} sm={4}>
            <ContentAbout />
          </Column>
        </Grid>
      </section>

      <Grid fullWidth>
        <Column lg={16} md={8} sm={4}>
          <section
            className="pageSection smt-box"
            id="best-work"
            aria-labelledby="best-work-heading"
            tabIndex={-1} // Make focusable by default
          >
            <h2 id="best-work-heading" className="sectionTitle">
              Best Work
            </h2>
            <ContentBestWork />
          </section>
        </Column>
      </Grid>
    </div>
  );
}

import React from 'react';
import { ContentLayout } from '../../components/layouts';
import snowmanpic from '../../assets/snowman.jpg';

export const Home: React.FC = () => {
  return (
    <ContentLayout>
      <img src={snowmanpic} className="w-96 m-auto float-start p-10" />
      <h2 className="text-6xl font-bold m-auto mb-10 text-center">About Me</h2>
      <p className="my-8 p-4">
        &emsp;Hi, my name is Nickolas Larson, and I'm a Software Engineer. I
        created this site/blog to hone my skills and document my projects. My
        ultimate goal is to learn and receive feedback from friends, peers, and
        anyone who comes across this site.
        {/*
        &emsp;Hi, my name is Nickolas Larson. From a young age, I knew I wanted
        to work with computers, particularly in video game development. However,
        due to financial circumstances when I graduated high school, I chose to
        join the United States Air Force. This decision turned out to be one of
        the best I could have made. During my six years in the Air Force, I had
        the opportunity to travel, mature, and develop numerous skills that
        continue to benefit me today.
        <br />
        &emsp;After completing my service, I pursued a degree in Computer
        Science. I began my studies at Minot State University and later
        transferred to California State University, where I completed my degree.
        Shortly after graduating, I landed my first tech job at Avadine, where I
        worked on SCADA systems. After about ten months, I received an offer
        from General Motors as a Software Developer, which allowed me to
        relocate to Austin, Texas.
        <br />
        &emsp;Now I'm working on a few thing to further my career and gain a few
        new skills along the way. Firstly, I'm working on this website/blog to
        document some of the work I'm doing with personal projects. My hope is
        that it improves my ability to describe describe certains topics while
        keeping a log of my past work, and potentially get some feedback from
        friends and peers that may take a look at it. The second thing I'm doing
        is working towards getting my Masters Degree. I'm currenlty enrolled at
        Georgia Tech through the OMSCS program.
        */}
      </p>
    </ContentLayout>
  );
};

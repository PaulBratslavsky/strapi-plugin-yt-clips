import React, { useEffect, useState } from 'react';
import { JSONInput, Field, Box, Flex } from '@strapi/design-system';
import styled from 'styled-components';

interface InputProps {
  name: string;
  value: VideoData | null;
  onChange: (e: { target: { name: string; value: string } }) => void;
}

interface VideoData {
  videoId: string;
  start: string;
  end: string;
}

const Input = ({ name, value, onChange }: InputProps) => {
  const [videoData, setVideoData] = useState<VideoData | null>(value);

  useEffect(() => {
    onChange({ target: { name, value: JSON.stringify(videoData) } });
  }, [videoData, name, onChange]);

  const handleVideoDataChange = (field: 'videoId' | 'start' | 'end', value: string) => {
    setVideoData((prevData) => ({
      videoId: prevData?.videoId ?? '',
      start: prevData?.start ?? '',
      end: prevData?.end ?? '',
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <Box padding={4} gap={4}>
      <Field.Root>
        <Field.Label>YouTube Video ID</Field.Label>
        <Field.Input
          type="text"
          placeholder="YouTube Video ID"
          value={videoData?.videoId ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleVideoDataChange('videoId', e.target.value);
          }}
        />
      </Field.Root>
      {videoData?.videoId && (
        <Flex flexDirection="column" gap={4} marginBottom={4} marginTop={4}>
          <>
            <Field.Root flex={1}>
              <Field.Label>Start Time (seconds)</Field.Label>
              <Field.Input
                type="text"
                placeholder="Start Time (seconds)"
                value={videoData?.start || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleVideoDataChange('start', e.target.value)}
              />
            </Field.Root>

            <Field.Root flex={1}>
              <Field.Label>End Time (seconds)</Field.Label>
              <Field.Input
                type="text"
                placeholder="End Time (seconds)"
                value={videoData?.end || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleVideoDataChange('end', e.target.value)}
              />
            </Field.Root>
          </>
        </Flex>
      )}
      <JSONInput
        id={name}
        name={name}
        value={JSON.stringify(videoData)}
        onChange={(json: string) => {
          try {
            const parsedJson = JSON.parse(json);
            setVideoData(parsedJson);
            onChange({ target: { name, value: json } });
          } catch (error) {
            console.error('Invalid JSON:', error);
          }
        }}
      />

      <pre>{JSON.stringify(videoData, null, 2)}</pre>
      <pre>{JSON.stringify(value)}</pre>

      {videoData?.videoId && (
        <ResponsiveIframeContainer>
          <iframe
            src={`https://www.youtube.com/embed/${videoData?.videoId}?start=${videoData?.start}&end=${videoData?.end}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </ResponsiveIframeContainer>
      )}
    </Box>
  );
};

const ResponsiveIframeContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Input;

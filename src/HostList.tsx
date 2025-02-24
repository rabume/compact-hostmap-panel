import React, { useMemo } from 'react';
import type { DataFrame, GrafanaTheme2 } from '@grafana/data';
import { css, cx } from 'emotion';
import { useTheme2, useStyles2 } from '@grafana/ui';

import HostItem, { ITEM_STYLES } from './HostItem';

interface HostListProps {
  data: Record<string, DataFrame[]>;
  width: number;
  height: number;
}

const HostList: React.FC<HostListProps> = ({ data, width, height }) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);

  const entries = useMemo(() => Object.entries(data), [data]);

  const { listWidth, listHeight, itemStyle, isOverflow } = useMemo(() => {
    const _itemStyle = ITEM_STYLES[0];
    const _listWidth = width;
    const _listHeight = height;
    const _isOverflow = true;

    return { listWidth: _listWidth, listHeight: _listHeight, itemStyle: _itemStyle, isOverflow: _isOverflow };
  }, [width, height, entries.length]);

  return (
    <div
      className={cx(
        styles.hostList,
        css`
          width: ${listWidth ? `${listWidth}px` : undefined};
          height: ${listHeight ? `${listHeight}px` : undefined};
          align-self: ${isOverflow ? 'flex-start' : undefined};
        `
      )}
    >
      {entries.map(([name, dataFrames], idx) => (
        <HostItem key={name} name={name} dataFrames={dataFrames} itemIndex={idx} itemStyle={itemStyle} />
      ))}
    </div>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  hostList: css`
    display: inline-flex;
    flex-wrap: wrap;
    text-align: center;
  `,
});

export default HostList;

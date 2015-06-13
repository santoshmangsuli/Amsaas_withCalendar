package com.ams.domain.repository;

import java.util.ArrayList;
import java.util.List;

public class Page<T>
{
	private int		index		= 0;
	private int		offset		= 0;
	private List<T>	pageDataList	= new ArrayList<T>();

	public Page()
	{}

	public Page(int index, int offset)
	{
		this.index = index;
		this.offset = offset;

	}

	public int getIndex()
	{
		return index;
	}

	public int getOffset()
	{
		return offset;
	}

	public List<T> getPageDataList()
	{
		return pageDataList;
	}

	public void setPageDataList(List<T> dataList)
	{
		this.pageDataList = dataList;
	}

}
